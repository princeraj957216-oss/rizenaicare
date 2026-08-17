import { AIService } from '../services/aiService.js';
import { ReportAnalysisService } from '../services/reportAnalysisService.js';
import { FallbackKnowledgeEngine } from '../providers/fallbackKnowledgeEngine.js';
import { sanitizeInput } from '../utils/sanitize.js';

export class AIController {
  static async handleChat(req, res, next) {
    try {
      const { message, context, language = 'en' } = sanitizeInput(req.body);
      if (!message) {
        return res.status(400).json({ success: false, error: 'Message is required' });
      }

      const fallbackFn = () => FallbackKnowledgeEngine.chatResponse(message, context, language);
      const result = await AIService.generateWithFailover(message, {
        language,
        task: 'chat',
        fallbackFn
      });

      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  static async analyzeSymptoms(req, res, next) {
    try {
      const { symptoms, duration, severity, age, gender, context, language = 'en' } = sanitizeInput(req.body);
      if (!symptoms) {
        return res.status(400).json({ success: false, error: 'Symptoms description is required' });
      }

      const fallbackFn = () => FallbackKnowledgeEngine.analyzeSymptoms(
        { symptoms, duration, severity, age, gender, context },
        language
      );

      const prompt = `Perform a clinical educational symptom triage for:
Symptoms: ${symptoms}
Duration: ${duration || 'Not specified'}
Severity (1-10): ${severity || '5'}
Context: ${context || 'None'}

Provide structured educational guidance:
1. Urgency level (LOW / MODERATE / HIGH / CRITICAL)
2. Possible related general health conditions (educational only)
3. Self-care recommendations and hydration
4. Red flag warning signs requiring immediate medical care
5. Recommended questions for their doctor`;

      const result = await AIService.generateWithFailover(prompt, {
        language,
        task: 'symptoms',
        fallbackFn
      });

      // If fallbackFn was invoked directly it returns structured object
      if (result.urgency) {
        return res.json({ success: true, data: result });
      }

      res.json({
        success: true,
        data: {
          urgency: 'MODERATE',
          symptomsAnalyzed: symptoms,
          aiResponseText: result.text,
          disclaimer: result.disclaimer,
          provider: result.provider
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMedicineInformation(req, res, next) {
    try {
      const { problem, language = 'en' } = sanitizeInput(req.body);
      if (!problem) {
        return res.status(400).json({ success: false, error: 'Health problem or symptom is required' });
      }

      const fallbackFn = () => FallbackKnowledgeEngine.getMedicineInfo(problem, language);
      const result = fallbackFn();

      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  static async analyzeReport(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No medical report file uploaded' });
      }

      const language = req.body.language || 'en';
      const result = await ReportAnalysisService.analyzeMedicalReport(
        req.file.path,
        req.file.originalname,
        req.file.mimetype,
        language
      );

      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  static async analyzePrescription(req, res, next) {
    try {
      const language = req.body.language || 'en';
      const filename = req.file ? req.file.originalname : 'Prescription Input';
      const result = FallbackKnowledgeEngine.analyzePrescription({ filename }, language);

      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  static async generateDietPlan(req, res, next) {
    try {
      const { goal, preferences, restrictions, healthConditions, language = 'en' } = sanitizeInput(req.body);
      const fallbackFn = () => FallbackKnowledgeEngine.generateDietPlan(
        { goal, preferences, restrictions, healthConditions },
        language
      );

      const result = fallbackFn();
      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}
