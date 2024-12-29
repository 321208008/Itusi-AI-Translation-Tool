export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface LanguageGroup {
  name: {
    en: string;
    zh: string;
  };
  languages: Language[];
}

export const languageGroups: LanguageGroup[] = [
  {
    name: {
      en: 'Common Languages',
      zh: '常用语言',
    },
    languages: [
      { code: 'auto', name: 'Auto Detect', nativeName: '自动检测' },
      { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文' },
      { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
    ],
  },
  {
    name: {
      en: 'European Languages',
      zh: '欧洲语言',
    },
    languages: [
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'it', name: 'Italian', nativeName: 'Italiano' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'ru', name: 'Russian', nativeName: 'Русский' },
      { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
      { code: 'pl', name: 'Polish', nativeName: 'Polski' },
      { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
      { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
      { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
      { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
      { code: 'da', name: 'Danish', nativeName: 'Dansk' },
      { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
      { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
      { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
    ],
  },
  {
    name: {
      en: 'Asian Languages',
      zh: '亚洲语言',
    },
    languages: [
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'th', name: 'Thai', nativeName: 'ไทย' },
      { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
      { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
      { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
      { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
      { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
      { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
    ],
  },
  {
    name: {
      en: 'Other Languages',
      zh: '其他语言',
    },
    languages: [
      { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
      { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
      { code: 'la', name: 'Latin', nativeName: 'Latina' },
      { code: 'ro', name: 'Romanian', nativeName: 'Română' },
      { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
      { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
      { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
      { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
      { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
      { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
      { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
      { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
    ],
  },
];
