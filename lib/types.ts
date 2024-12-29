export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export type TranslationProvider = 'deepseek' | 'qianwen';

export type TranslationRequest = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider: TranslationProvider;
};

export interface ApiKeys {
  deepseek: string;
  qianwen: string;
}

export interface TranslationResponse {
  translatedText: string;
  error?: string;
}

export type CustomFetch = (url: string, init?: RequestInit & { agent?: any }) => Promise<Response>;