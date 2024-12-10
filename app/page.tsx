'use client';

import { Languages } from 'lucide-react';
import { Github, Twitter, Globe } from 'lucide-react';
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
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://github.com/321208008"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com/zyailive"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="https://itusi.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                Itusi
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Translation Tool. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}