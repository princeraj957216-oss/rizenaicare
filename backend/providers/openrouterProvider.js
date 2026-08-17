import axios from 'axios';

export class OpenRouterProvider {
  static async generate(prompt, systemInstruction = '', options = {}) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const url = 'https://openrouter.ai/api/v1/chat/completions';
    
    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await axios.post(
      url,
      {
        model: options.model || 'meta-llama/llama-3.3-70b-instruct',
        messages,
        temperature: options.temperature || 0.3,
        max_tokens: options.maxTokens || 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://rizencare.ai',
          'X-Title': 'RIZEN CARE AI Platform'
        },
        timeout: 20000
      }
    );

    const text = response.data?.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error('Empty response received from OpenRouter API');
    }

    return {
      text,
      provider: 'OpenRouter'
    };
  }
}
