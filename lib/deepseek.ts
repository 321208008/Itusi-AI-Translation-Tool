import { TranslationRequest } from './types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface Message {
  role: 'system' | 'user';
  content: string;
}

export async function translateWithDeepSeek(
  request: TranslationRequest,
  apiKey: string
): Promise<string> {
  const { text, sourceLanguage, targetLanguage } = request;
  
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are a professional translator. Translate the following text ${
        sourceLanguage !== 'auto' ? `from ${sourceLanguage}` : ''
      } to ${targetLanguage}. Only return the translated text without any explanations or additional information.`
    },
    {
      role: 'user',
      content: text
    }
  ];

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Translation failed');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('[DeepSeek API Error]', error);
    throw error;
  }
}
