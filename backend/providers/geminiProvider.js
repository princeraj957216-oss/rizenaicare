import axios from 'axios';
import fs from 'fs';

export class GeminiProvider {
  static async extractMedicalTextFromImage(filePath, mimeType, filename = '') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

    const imageData = fs.readFileSync(filePath).toString('base64');
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
    const prompt = `Read this uploaded file directly and return only the visible text/content for medical analysis. File: ${filename}. If it contains any symptoms, diagnosis, medicine, prescription, test result, patient detail, clinical observation, or healthcare instruction, transcribe that content exactly. Do not invent values. If it contains no healthcare information, return exactly NOT_MEDICAL. If it is unreadable, return exactly UNREADABLE.`;
    const response = await axios.post(url, {
      contents: [{ role: 'user', parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: imageData } }] }],
      generationConfig: { temperature: 0, maxOutputTokens: 2500 }
    }, { headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey }, timeout: 30000 });
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error('Empty image analysis response');
    return text;
  }

  static async generate(prompt, systemInstruction = '', options = {}) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
    
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
      headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey },
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
