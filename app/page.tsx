'use client';

import { Languages } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Settings } from '@/components/Settings';
import { TranslationArea } from '@/components/TranslationArea';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { useTranslation } from '@/lib/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-6 w-6" />
            <h1 className="text-xl font-semibold">{t('title')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Settings />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <ApiKeyInput />
        <TranslationArea />
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/321208008"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/zyailive"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}