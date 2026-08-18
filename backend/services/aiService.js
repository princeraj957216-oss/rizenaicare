import { GeminiProvider } from '../providers/geminiProvider.js';
import { OpenRouterProvider } from '../providers/openrouterProvider.js';
import { GroqProvider } from '../providers/groqProvider.js';
import { FallbackKnowledgeEngine } from '../providers/fallbackKnowledgeEngine.js';

export class AIService {
  static async extractMedicalTextFromImage(filePath, mimeType, filename = '') {
    return GeminiProvider.extractMedicalTextFromImage(filePath, mimeType, filename);
  }

  static getSystemPrompt(language = 'en', task = 'general') {
    const langNames = {
      en: 'English',
      hi: 'Hindi (हिन्दी)',
      bn: 'Bengali (বাংলা)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      mr: 'Marathi (मराठी)'
    };
    const targetLang = langNames[language] || 'English';

    return `You are RIZEN CARE AI, a trusted, empathetic, and highly capable AI Healthcare Assistant.
CRITICAL SAFETY AND CLINICAL PROTOCOLS:
1. Target Language: Always respond completely and naturally in ${targetLang}.
2. Medical Disclaimer: You provide general educational health guidance, symptom analysis, and wellness information. You do NOT provide a definitive diagnosis or replace an in-person clinical evaluation.
3. Medication Safety: NEVER act as an automatic prescription engine. Do NOT tell users to start, stop, or change doses of prescription medications. Always include general precautions and advise consulting a qualified doctor or pharmacist.
4. Red Flags: If any query suggests emergency symptoms (e.g. crushing chest pain, severe dyspnea, sudden numbness, uncontrolled bleeding), immediately prioritize urgent emergency medical care (112/102/911).
5. Tone: Professional, reassuring, clear, and structured with helpful bullet points.`;
  }

  static async generateWithFailover(prompt, options = {}) {
    const { language = 'en', task = 'general', fallbackFn = null } = options;
    const systemPrompt = AIService.getSystemPrompt(language, task);

    const providers = [
      { name: 'Gemini', exec: () => GeminiProvider.generate(prompt, systemPrompt, options) },
      { name: 'OpenRouter', exec: () => OpenRouterProvider.generate(prompt, systemPrompt, options) },
      { name: 'Groq', exec: () => GroqProvider.generate(prompt, systemPrompt, options) }
    ];

    for (const provider of providers) {
      try {
        const res = await provider.exec();
        if (res && res.text) {
          return {
            ...res,
            disclaimer: FallbackKnowledgeEngine.getDisclaimer(language)
          };
        }
      } catch (err) {
        // Fall through quietly to next provider
      }
    }

    // If external providers are not configured or failed, use offline Medical Knowledge Engine
    if (typeof fallbackFn === 'function') {
      return fallbackFn();
    }

    return FallbackKnowledgeEngine.chatResponse(prompt, {}, language);
  }
}
