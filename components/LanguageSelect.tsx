'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { languageGroups } from '@/lib/languages-data';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/useTranslation';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LanguageSelect({
  value,
  onChange,
  placeholder,
}: LanguageSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const { language } = useStore();
  const { t } = useTranslation();

  // 获取当前选中语言的显示名称
  const getSelectedLanguageDisplay = () => {
    for (const group of languageGroups) {
      const foundLanguage = group.languages.find((lang) => lang.code === value);
      if (foundLanguage) {
        return language === 'zh' ? foundLanguage.nativeName : foundLanguage.name;
      }
    }
    return value;
  };

  // 过滤语言
  const filteredGroups = React.useMemo(() => {
    if (!search) return languageGroups;
    
    const searchLower = search.toLowerCase();
    return languageGroups.map(group => ({
      ...group,
      languages: group.languages.filter(lang => 
        lang.name.toLowerCase().includes(searchLower) ||
        lang.nativeName.toLowerCase().includes(searchLower) ||
        lang.code.toLowerCase().includes(searchLower)
      )
    })).filter(group => group.languages.length > 0);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? getSelectedLanguageDisplay() : placeholder || t('selectLanguage')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="flex items-center border-b p-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={t('searchLanguage')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t('noLanguageFound')}
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.name.en}>
                <div className="sticky top-0 bg-background px-3 py-2 text-sm font-medium text-muted-foreground">
                  {group.name[language]}
                </div>
                {group.languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant="ghost"
                    className="w-full justify-start px-3 py-1.5 text-sm font-normal"
                    onClick={() => {
                      onChange(lang.code);
                      setOpen(false);
                      setSearch('');
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === lang.code ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className="flex items-center gap-2">
                      <span>{language === 'zh' ? lang.nativeName : lang.name}</span>
                      {language !== 'zh' && lang.nativeName !== lang.name && (
                        <span className="text-muted-foreground text-sm">
                          ({lang.nativeName})
                        </span>
                      )}
                    </span>
                  </Button>
                ))}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
