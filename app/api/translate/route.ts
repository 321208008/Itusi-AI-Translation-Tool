import { NextResponse } from 'next/server';
import type { TranslationRequest, TranslationResponse } from '@/lib/types';
import { translateWithDeepSeek } from '@/lib/deepseek';
import { translateWithQianwen } from '@/lib/qianwen';

export async function POST(request: Request) {
  try {
    const body = await request.json() as TranslationRequest;
    console.log('[Translation Request]', body);

    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 401 }
      );
    }

    console.log('[Translation] Using API key:', apiKey.slice(0, 4) + '****');

    let translatedText: string;

    switch (body.provider) {
      case 'deepseek':
        translatedText = await translateWithDeepSeek(
          body.text,
          body.sourceLanguage,
          body.targetLanguage,
          apiKey
        );
        break;
      case 'qianwen':
        translatedText = await translateWithQianwen(
          body.text,
          body.sourceLanguage,
          body.targetLanguage,
          apiKey
        );
        break;
      default:
        throw new Error(`Unsupported provider: ${body.provider}`);
    }

    const response: TranslationResponse = {
      translatedText,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Translation Error]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}