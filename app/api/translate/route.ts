import { NextResponse } from 'next/server';
import type { TranslationRequest, TranslationResponse } from '@/lib/types';
import { translateWithDeepSeek } from '@/lib/deepseek';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body: TranslationRequest = await request.json();
    
    console.log('[Translation Request]', {
      provider: body.provider,
      text: body.text,
      sourceLanguage: body.sourceLanguage,
      targetLanguage: body.targetLanguage,
    });
    
    // Extract API key from headers
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey) {
      console.error('[Translation Error] Missing API key');
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 401 }
      );
    }

    console.log('[Translation] Using API key:', apiKey.slice(0, 4) + '****');

    let translatedText: string;

    if (body.provider === 'deepseek') {
      console.log('[DeepSeek] Initiating translation request');
      try {
        translatedText = await translateWithDeepSeek(body, apiKey);
        console.log('[DeepSeek] Translation successful');
      } catch (error: unknown) {
        console.error('[DeepSeek Error]', error);
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        if (errorMessage.includes('Insufficient Balance')) {
          console.log('[DeepSeek] Insufficient Balance');
          return NextResponse.json(
            { error: 'DeepSeek API 余额不足，请充值后再试' },
            { status: 402 }
          );
        } else if (errorMessage.includes('API')) {
          console.log('[DeepSeek] API Error');
          return NextResponse.json(
            { error: 'DeepSeek API 调用失败，请稍后再试' },
            { status: 500 }
          );
        } else {
          throw error;
        }
      }
    } else {
      throw new Error(`Unsupported provider: ${body.provider}`);
    }

    const response: TranslationResponse = {
      translatedText,
      detectedLanguage: body.sourceLanguage === 'auto' ? 'en' : undefined,
    };

    console.log('[Translation Response]', {
      detectedLanguage: response.detectedLanguage,
      translatedTextLength: translatedText?.length,
    });

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('[Translation Error]', {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace available',
    });
    
    return NextResponse.json(
      { error: `Translation failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}