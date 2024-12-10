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
import { languages, regions, type Language } from '@/lib/languages-data';
import { useTranslation } from '@/lib/useTranslation';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function LanguageSelect({
  value,
  onChange,
  placeholder,
  disabled
}: LanguageSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { t } = useTranslation();

  const selectedLanguage = languages.find((lang) => lang.code === value);
  const filteredLanguages = React.useMemo(() => {
    if (!search) return languages;
    const searchLower = search.toLowerCase();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchLower) ||
        lang.nativeName.toLowerCase().includes(searchLower) ||
        lang.code.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const groupedLanguages = React.useMemo(() => {
    return filteredLanguages.reduce((acc, lang) => {
      if (!acc[lang.region]) {
        acc[lang.region] = [];
      }
      acc[lang.region].push(lang);
      return acc;
    }, {} as Record<string, Language[]>);
  }, [filteredLanguages]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedLanguage ? (
            <span className="flex items-center gap-2">
              <span>{selectedLanguage.nativeName}</span>
              <span className="text-muted-foreground">
                ({selectedLanguage.name})
              </span>
            </span>
          ) : (
            <span>{placeholder || t('selectLanguage')}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <div className="flex items-center border-b p-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={t('searchLanguage')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[300px] overflow-auto">
          {Object.entries(regions).map(([region, regionName]) => {
            const regionLanguages = groupedLanguages[region];
            if (!regionLanguages?.length) return null;
            
            return (
              <div key={region}>
                <div className="sticky top-0 bg-background px-3 py-2 text-sm font-medium text-muted-foreground">
                  {regionName}
                </div>
                {regionLanguages.map((language) => (
                  <Button
                    key={language.code}
                    variant="ghost"
                    className="w-full justify-start px-3 py-1.5 text-sm font-normal"
                    onClick={() => {
                      onChange(language.code);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === language.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex items-center gap-2">
                      <span>{language.nativeName}</span>
                      <span className="text-muted-foreground">
                        ({language.name})
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            );
          })}
          {filteredLanguages.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t('noLanguageFound')}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
