'use client';

import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

export function LanguageToggle() {
  const { language, setLanguage } = useStore();

  return (
    <Button
      variant="ghost"
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="h-9 px-4"
    >
      {language === 'en' ? 'EN' : '中文'}
    </Button>
  );
}