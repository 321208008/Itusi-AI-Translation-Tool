export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export type TranslationProvider = 'deepseek';

export type TranslationRequest = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider: TranslationProvider;
};

export type TranslationResponse = {
  translatedText: string;
  detectedLanguage?: string;
  error?: string;
};