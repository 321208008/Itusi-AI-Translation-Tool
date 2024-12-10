export type Language = {
  code: string;
  name: string;
  nativeName: string;
  region: string;
};

export const regions = {
  asia: "亚洲",
  europe: "欧洲",
  americas: "美洲",
  africa: "非洲",
  oceania: "大洋洲",
  other: "其他",
} as const;

export const languages: Language[] = [
  // 亚洲语言
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", region: "asia" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", region: "asia" },
  { code: "ja", name: "Japanese", nativeName: "日本語", region: "asia" },
  { code: "ko", name: "Korean", nativeName: "한국어", region: "asia" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", region: "asia" },
  { code: "th", name: "Thai", nativeName: "ไทย", region: "asia" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", region: "asia" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", region: "asia" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", region: "asia" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", region: "asia" },
  { code: "ar", name: "Arabic", nativeName: "العربية", region: "asia" },
  { code: "fa", name: "Persian", nativeName: "فارسی", region: "asia" },
  { code: "ur", name: "Urdu", nativeName: "اردو", region: "asia" },

  // 欧洲语言
  { code: "en", name: "English", nativeName: "English", region: "europe" },
  { code: "fr", name: "French", nativeName: "Français", region: "europe" },
  { code: "de", name: "German", nativeName: "Deutsch", region: "europe" },
  { code: "es", name: "Spanish", nativeName: "Español", region: "europe" },
  { code: "it", name: "Italian", nativeName: "Italiano", region: "europe" },
  { code: "pt", name: "Portuguese", nativeName: "Português", region: "europe" },
  { code: "ru", name: "Russian", nativeName: "Русский", region: "europe" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", region: "europe" },
  { code: "pl", name: "Polish", nativeName: "Polski", region: "europe" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", region: "europe" },
  { code: "ro", name: "Romanian", nativeName: "Română", region: "europe" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", region: "europe" },
  { code: "cs", name: "Czech", nativeName: "Čeština", region: "europe" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", region: "europe" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", region: "europe" },
  { code: "da", name: "Danish", nativeName: "Dansk", region: "europe" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", region: "europe" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", region: "europe" },

  // 美洲语言
  { code: "es-MX", name: "Spanish (Mexico)", nativeName: "Español (México)", region: "americas" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", region: "americas" },
  { code: "qu", name: "Quechua", nativeName: "Runasimi", region: "americas" },
  { code: "ay", name: "Aymara", nativeName: "Aymar aru", region: "americas" },

  // 非洲语言
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", region: "africa" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", region: "africa" },
  { code: "ha", name: "Hausa", nativeName: "Hausa", region: "africa" },
  { code: "ig", name: "Igbo", nativeName: "Igbo", region: "africa" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá", region: "africa" },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", region: "africa" },

  // 大洋洲语言
  { code: "mi", name: "Maori", nativeName: "Te Reo Māori", region: "oceania" },
  { code: "haw", name: "Hawaiian", nativeName: "ʻŌlelo Hawaiʻi", region: "oceania" },
  { code: "sm", name: "Samoan", nativeName: "Gagana Sāmoa", region: "oceania" },

  // 其他语言
  { code: "eo", name: "Esperanto", nativeName: "Esperanto", region: "other" },
  { code: "la", name: "Latin", nativeName: "Latina", region: "other" },
];

// 按区域分组的语言
export const languagesByRegion = languages.reduce((acc, lang) => {
  if (!acc[lang.region]) {
    acc[lang.region] = [];
  }
  acc[lang.region].push(lang);
  return acc;
}, {} as Record<string, Language[]>);

// 搜索语言
export function searchLanguages(query: string): Language[] {
  const searchTerm = query.toLowerCase();
  return languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm) ||
      lang.nativeName.toLowerCase().includes(searchTerm) ||
      lang.code.toLowerCase().includes(searchTerm)
  );
}
