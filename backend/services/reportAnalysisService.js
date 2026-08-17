import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import { AIService } from './aiService.js';
import { FallbackKnowledgeEngine } from '../providers/fallbackKnowledgeEngine.js';

export class ReportAnalysisService {
  static async extractTextFromFile(filePath, mimeType) {
    try {
      if (mimeType === 'application/pdf' || filePath.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text || '';
      } else {
        // For images, return a structured placeholder tag for visual medical report
        return `[IMAGE MEDICAL REPORT: ${path.basename(filePath)}]`;
      }
    } catch (err) {
      return '';
    }
  }

  static async analyzeMedicalReport(filePath, filename, mimeType, language = 'en') {
    const rawText = await ReportAnalysisService.extractTextFromFile(filePath, mimeType);
    
    const fallbackFn = () => FallbackKnowledgeEngine.analyzeReport({ text: rawText, filename, mimeType }, language);

    if (!rawText || rawText.length < 20) {
      return fallbackFn();
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

    try {
      const aiResult = await AIService.generateWithFailover(prompt, {
        language,
        task: 'report-analysis',
        fallbackFn
      });

      // Parse or augment structured format
      return {
        documentName: filename,
        extractedData: {
          patientNotice: 'Information extracted from the document',
          rawSummary: rawText.slice(0, 500)
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
      return fallbackFn();
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
