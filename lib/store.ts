import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TranslationProvider, ApiKeys } from './types';

interface Store {
  language: 'en' | 'zh';
  provider: TranslationProvider;
  apiKeys: ApiKeys;
  useDefaultApi: boolean;
  setLanguage: (language: 'en' | 'zh') => void;
  setProvider: (provider: TranslationProvider) => void;
  setApiKeys: (apiKeys: Partial<ApiKeys>) => void;
  setUseDefaultApi: (useDefault: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      language: 'en',
      provider: 'qianwen',
      apiKeys: {
        deepseek: '',
        qianwen: '',
      },
      useDefaultApi: true,
      setLanguage: (language) => set({ language }),
      setProvider: (provider) => set({ provider }),
      setApiKeys: (apiKeys) => set((state) => ({
        apiKeys: { ...state.apiKeys, ...apiKeys },
      })),
      setUseDefaultApi: (useDefault) => set({ useDefaultApi: useDefault }),
    }),
    {
      name: 'translation-store',
      partialize: (state) => ({
        language: state.language,
        provider: state.provider,
        apiKeys: state.apiKeys,
        useDefaultApi: state.useDefaultApi,
      }),
    }
  )
);