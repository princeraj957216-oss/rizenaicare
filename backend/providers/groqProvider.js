import axios from 'axios';

export class GroqProvider {
  static async generate(prompt, systemInstruction = '', options = {}) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';
    
    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await axios.post(
      url,
      {
        model: options.model || 'llama-3.3-70b-versatile',
        messages,
        temperature: options.temperature || 0.3,
        max_tokens: options.maxTokens || 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 18000
      }
    );

    const text = response.data?.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error('Empty response received from Groq API');
    }

    return {
      text,
      provider: 'Groq'
    };
  }
}
