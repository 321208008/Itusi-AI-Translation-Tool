import { create } from 'zustand';
import type { TranslationProvider } from './types';

interface ApiKeys {
  deepseek: string;
}

interface Store {
  language: 'en' | 'zh';
  provider: TranslationProvider;
  apiKeys: ApiKeys;
  setLanguage: (language: 'en' | 'zh') => void;
  setProvider: (provider: TranslationProvider) => void;
  setApiKeys: (apiKeys: ApiKeys) => void;
}

export const useStore = create<Store>()(
  (set) => ({
    language: 'en',
    provider: 'deepseek',
    apiKeys: {
      deepseek: '',
    },
    setLanguage: (language) => set({ language }),
    setProvider: (provider) => set({ provider }),
    setApiKeys: (apiKeys) => set({ apiKeys }),
  })
);