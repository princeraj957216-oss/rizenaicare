import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import pdfParse from 'pdf-parse';
import { AIService } from './aiService.js';
import { FallbackKnowledgeEngine } from '../providers/fallbackKnowledgeEngine.js';

const execFileAsync = promisify(execFile);

export class ReportAnalysisService {
  static isMedicalReportText(text, filename = '') {
    // Verification must use extracted document content. A filename is not
    // evidence that a file is medical and is intentionally ignored here.
    const content = String(text || '').toLowerCase();
    const medicalTerms = ['patient', 'symptom', 'treatment', 'clinical', 'laboratory', 'lab report', 'medical report', 'hemoglobin', 'haemoglobin', 'hba1c', 'glucose', 'cholesterol', 'creatinine', 'thyroid', 'urine', 'blood', 'cbc', 'lft', 'kft', 'rbc', 'wbc', 'platelet', 'bilirubin', 'sodium', 'potassium', 'vitamin', 'diagnosis', 'radiology', 'x-ray', 'mri', 'ct scan', 'prescription', 'medicine', 'medication', 'tablet', 'capsule', 'syrup', 'injection', 'ointment', 'dosage', 'dose', 'mg/dl', 'doctor', 'hospital', 'specimen', 'reference range', 'pathology'];
    const hasHbMarker = /\bhb\b/i.test(content);
    const medicalMatches = medicalTerms.filter((term) => content.includes(term)).length;
    // Medical evidence in the document takes precedence over generic words
    // such as "certificate". Clearly unrelated documents have no medical
    // evidence and are rejected without generating findings.
    return medicalMatches >= 1 || hasHbMarker;
  }

  static extractStructuredDetails(rawText = '') {
    const lines = rawText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const parameters = [];
    const medicines = [];
    const observations = [];
    const valuePattern = /(\d+(?:\.\d+)?\s*(?:mg\/dL|g\/dL|mg\/L|mmol\/L|mIU\/L|uIU\/mL|IU\/L|%|bpm|\/µL|\/mcL|cells\/cumm|mm\/hr))/i;
    const medicinePattern = /\b(?:tablet|tab|capsule|cap|syrup|injection| ointment|mg|mcg|ml)\b/i;

    for (const line of lines) {
      const valueMatch = line.match(valuePattern);
      if (valueMatch) {
        const name = line.slice(0, valueMatch.index).replace(/[:\-–]+\s*$/, '').trim();
        if (name.length >= 2 && !/^(date|age|phone|id|registration)$/i.test(name)) {
          const referenceMatch = line.match(/(?:ref(?:erence)?|normal|range)\s*[:\-]?\s*(.+)$/i);
          parameters.push({ name: name.slice(0, 80), value: valueMatch[1].trim(), reference: referenceMatch?.[1]?.trim() || 'See original report', status: 'REPORTED' });
        }
      }
      if (medicinePattern.test(line) && /[a-z]{3,}/i.test(line)) medicines.push(line.slice(0, 180));
      if (/\b(impression|observation|finding|diagnosis|conclusion|comment)\b\s*[:\-]/i.test(line)) observations.push(line.slice(0, 240));
    }
    return { parameters: parameters.slice(0, 40), medicines: [...new Set(medicines)].slice(0, 20), observations: [...new Set(observations)].slice(0, 20) };
  }

  static createSafeResult(rawText, filename, language = 'en') {
    const hasExtractedText = Boolean(rawText && rawText.trim());
    const details = ReportAnalysisService.extractStructuredDetails(rawText);
    return {
      documentName: filename,
      extractedData: {
        patientNotice: hasExtractedText ? 'Text extracted directly from the uploaded medical report. No values were generated.' : 'The medical report image was received, but readable text could not be extracted. No clinical values were generated.',
        rawSummary: rawText.slice(0, 1500),
        parameters: details.parameters,
        medicines: details.medicines,
        observations: details.observations
      },
      aiInterpretation: {
        summary: hasExtractedText
          ? 'The uploaded medical document was analyzed and its text was extracted. Please review the original report with a qualified healthcare professional.'
          : 'The medical report image was received, but readable text could not be extracted. Please upload a clearer image or PDF. No medical findings were generated.',
        keyFindings: [],
        questionsForDoctor: ['Can you explain the reported values and reference ranges in my original report?']
      },
      disclaimer: FallbackKnowledgeEngine.getDisclaimer(language),
      provider: 'Direct document analysis'
    };
  }

  static async extractTextFromFile(filePath, mimeType, filename = '') {
    try {
      if (mimeType === 'application/pdf' || filePath.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text || '';
      } else {
        // Use an optional system Tesseract installation for scanned reports.
        // If OCR is unavailable, return no text and reject rather than guessing
        // from a filename or inventing medical content.
        try {
          const { stdout } = await execFileAsync('tesseract', [filePath, 'stdout', '--psm', '6'], { timeout: 30000, windowsHide: true });
          if (stdout?.trim()) return stdout;
        } catch {
          // Continue to the configured AI vision fallback below.
        }
        try {
          const visionText = await AIService.extractMedicalTextFromImage(filePath, mimeType, filename);
          if (visionText === 'NOT_MEDICAL' || visionText === 'UNREADABLE') return '';
          return visionText;
        } catch {
          return '';
        }
      }
    } catch (err) {
      return '';
    }
  }

  static async analyzeMedicalReport(filePath, filename, mimeType, language = 'en') {
    const rawText = await ReportAnalysisService.extractTextFromFile(filePath, mimeType, filename);
    try {
      if (!rawText || !ReportAnalysisService.isMedicalReportText(rawText, filename)) {
        const isImage = mimeType.startsWith('image/');
        const message = isImage && !rawText
          ? 'This image could not be verified because readable text could not be extracted. Please upload a clearer medical report image or PDF.'
          : 'This is not a medical report or medical prescription. Please upload a valid medical document.';
        const error = new Error(message);
        error.statusCode = 422;
        throw error;
      }
      const prompt = `Analyze this uploaded laboratory / medical test report:
Document Name: ${filename}
Extracted Text:
"""
${rawText.slice(0, 3000)}
"""

Please format your response clearly into:
1. Summary of findings
2. Key normal and abnormal parameters with reference ranges
3. Practical lifestyle / wellness considerations
4. Specific questions to discuss with their treating physician`;
      const extractedDetails = ReportAnalysisService.extractStructuredDetails(rawText);
      const aiResult = await AIService.generateWithFailover(prompt, {
        language,
        task: 'report-analysis',
        fallbackFn: () => ReportAnalysisService.createSafeResult(rawText, filename, language)
      });
      if (aiResult?.provider === 'Direct document analysis') return aiResult;

      // Parse or augment structured format
      return {
        documentName: filename,
        extractedData: {
          patientNotice: 'Information extracted from the document',
          rawSummary: rawText.slice(0, 1500),
          parameters: extractedDetails.parameters,
          medicines: extractedDetails.medicines,
          observations: extractedDetails.observations
        },
        aiInterpretation: {
          summary: aiResult.text,
          keyFindings: [
            'Test results extracted from document.',
            'Values compared with standard diagnostic reference ranges.'
          ],
          questionsForDoctor: [
            'How do these results correlate with my current clinical symptoms?',
            'Are any follow-up tests or medication adjustments needed?'
          ]
        },
        disclaimer: FallbackKnowledgeEngine.getDisclaimer(language),
        provider: aiResult.provider
      };
    } catch (e) {
      if (e.statusCode === 422) throw e;
      return ReportAnalysisService.createSafeResult(rawText, filename, language);
    } finally {
      // Clean up uploaded temp file
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        // ignore file unlink err
      }
    }
  }
}
