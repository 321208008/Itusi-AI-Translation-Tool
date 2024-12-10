'use client';

import { useStore } from './store';
import { translations } from './translations';

export function useTranslation() {
  const { language } = useStore();
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const formatMessage = (key: string, values?: Record<string, string>) => {
    let message = t(key);
    
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, value);
      });
    }
    
    return message;
  };

  return { t, formatMessage };
}