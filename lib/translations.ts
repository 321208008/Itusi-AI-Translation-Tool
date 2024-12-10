export const translations = {
  en: {
    title: 'AI Translation Tool',
    settings: {
      title: 'Settings',
      provider: 'Provider',
      deepseekKey: 'DeepSeek API Key',
      apiKey: 'Enter your API key',
    },
    translation: {
      from: 'From:',
      to: 'To:',
      enterText: 'Enter text to translate...',
      result: 'Translation will appear here...',
      translate: 'Translate',
      copied: 'Copied',
      copyMessage: 'Translation copied to clipboard',
      autoDetect: 'Auto Detect'
    },
    errors: {
      apiKeyRequired: 'API Key Required',
      apiKeyMessage: 'Please set your {provider} API key in settings',
      translationError: 'Translation Error',
      failedTranslation: 'Failed to translate text'
    },
    selectLanguage: 'Select Language',
    searchLanguage: 'Search language...',
    noLanguageFound: 'No language found'
  },
  zh: {
    title: 'AI翻译工具',
    settings: {
      title: '设置',
      provider: '提供商',
      deepseekKey: 'DeepSeek API密钥',
      apiKey: '输入你的API密钥',
    },
    translation: {
      from: '从：',
      to: '到：',
      enterText: '请输入要翻译的文本...',
      result: '翻译结果将显示在这里...',
      translate: '翻译',
      copied: '已复制',
      copyMessage: '翻译内容已复制到剪贴板',
      autoDetect: '自动检测'
    },
    errors: {
      apiKeyRequired: '需要API密钥',
      apiKeyMessage: '请在设置中填写{provider}的API密钥',
      translationError: '翻译错误',
      failedTranslation: '翻译失败'
    },
    selectLanguage: '选择语言',
    searchLanguage: '搜索语言...',
    noLanguageFound: '未找到语言'
  }
} as const;