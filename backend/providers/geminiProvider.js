import axios from 'axios';

export class GeminiProvider {
  static async generate(prompt, systemInstruction = '', options = {}) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Request: ${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: options.temperature || 0.3,
        maxOutputTokens: options.maxTokens || 1500,
      }
    };

    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 18000
    });

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Empty response received from Gemini API');
    }

    return {
      text,
      provider: 'Google Gemini'
    };
  }
}
