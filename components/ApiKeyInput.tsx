'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import type { TranslationProvider } from '@/lib/types';

const providers = [
  { value: 'qianwen', label: 'Qwen' },
  { value: 'deepseek', label: 'DeepSeek' },
] as const;

export function ApiKeyInput() {
  const { t } = useTranslation();
  const { apiKeys, setApiKeys, useDefaultApi, setUseDefaultApi, provider, setProvider } = useStore();

  const handleApiKeyChange = (value: string) => {
    setApiKeys({
      [provider]: value,
    });
  };

  return (
    <Card className="w-full max-w-5xl mx-auto mb-6">
      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-0.5">
            <Label className="text-base font-medium">{t('settings.useDefaultApi')}</Label>
            <div className="text-sm text-muted-foreground">
              {t('settings.apiKeyDescription')}
            </div>
          </div>
          <Switch
            id="use-default-api"
            checked={useDefaultApi}
            onCheckedChange={setUseDefaultApi}
            className="ml-auto"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">{t('settings.provider')}</Label>
          <Select value={provider} onValueChange={(value) => setProvider(value as TranslationProvider)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {!useDefaultApi && (
          <div className="space-y-2">
            <Label className="text-base font-medium">
              {provider === 'deepseek' ? t('settings.deepseekKey') : t('settings.qwenKey')}
            </Label>
            <Input
              type="password"
              placeholder={t('settings.apiKeyPlaceholder')}
              value={apiKeys[provider]}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}