'use client';

import { useState } from 'react';
import { Copy, RotateCw, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/lib/useTranslation';
import { LanguageSelect } from './LanguageSelect';
import { config } from '@/lib/config';

export function TranslationArea() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const { provider, apiKeys, useDefaultApi } = useStore();
  const { toast } = useToast();
  const { t, formatMessage } = useTranslation();

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    const apiKey = useDefaultApi 
      ? config.defaultApiKeys[provider]
      : apiKeys[provider];

    if (!apiKey) {
      toast({
        title: t('errors.apiKeyRequired'),
        description: formatMessage('errors.apiKeyMessage', {
          provider: provider === 'deepseek' ? 'DeepSeek' : 'Qwen'
        }),
        variant: 'destructive',
      })
      return;
    }
    
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage,
          targetLanguage,
          provider,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setTranslatedText(data.translatedText);
    } catch (error) {
      toast({
        title: t('errors.translationError'),
        description: formatMessage('errors.failedTranslation'),
        variant: 'destructive',
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText);
    toast({
      title: t('translation.copied'),
      description: formatMessage('translation.copyMessage'),
    });
  };

  const swapLanguages = () => {
    if (sourceLanguage === 'auto') return;
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap">{t('translation.from')}</label>
              <div className="flex-1 min-w-[200px]">
                <LanguageSelect
                  value={sourceLanguage}
                  onChange={setSourceLanguage}
                  placeholder={t('translation.autoDetect')}
                />
              </div>
            </div>
            <Textarea
              placeholder={t('translation.enterText')}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="h-[300px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap">{t('translation.to')}</label>
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={swapLanguages}
                  disabled={sourceLanguage === 'auto'}
                  className="shrink-0"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 min-w-[200px]">
                  <LanguageSelect
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <Textarea
                value={translatedText}
                readOnly
                className="h-[300px]"
                placeholder={t('translation.result')}
              />
              {translatedText && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleTranslate}
            disabled={!sourceText.trim() || isTranslating}
          >
            {isTranslating ? (
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t('translation.translate')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}