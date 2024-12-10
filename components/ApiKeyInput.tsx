'use client';

import { useStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/lib/useTranslation';

export function ApiKeyInput() {
  const { provider, setProvider, apiKeys, setApiKeys } = useStore();
  const { t } = useTranslation();

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">{t('settings.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('settings.provider')}</label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deepseek">DeepSeek</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('settings.deepseekKey')}
          </label>
          <Input
            type="password"
            value={apiKeys[provider]}
            onChange={(e) =>
              setApiKeys({ ...apiKeys, [provider]: e.target.value })
            }
            placeholder={`${t('settings.apiKey')}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}