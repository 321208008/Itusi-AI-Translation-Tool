const QIANWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

export async function translateWithQianwen(
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  apiKey: string
): Promise<string> {
  try {
    const prompt = `Translate the following text ${sourceLanguage !== 'auto' ? `from ${sourceLanguage}` : ''} to ${targetLanguage}. Only provide the translation, no explanations:
${text}`;

    const response = await fetch(QIANWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a professional translator. Translate the text exactly as provided, maintaining the original meaning and style. Only return the translation, no explanations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Qwen API Error]', error);
      throw new Error(error.message || 'Translation failed');
    }

    const data = await response.json();
    const translation = data.output?.text?.trim();

    if (!translation) {
      throw new Error('Empty translation response');
    }

    return translation;
  } catch (error) {
    console.error('[Qwen Translation Error]', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key: Please check your Qwen API key');
      }
    }
    throw new Error(error instanceof Error ? error.message : 'Translation failed');
  }
} 