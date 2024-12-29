import type { ApiKeys } from './types';

export const config = {
  defaultApiKeys: {
    qianwen: process.env.NEXT_PUBLIC_DEFAULT_QIANWEN_API_KEY || '',
    deepseek: process.env.NEXT_PUBLIC_DEFAULT_DEEPSEEK_API_KEY || '',
  } as ApiKeys,
} as const;

// 验证配置
export function validateConfig() {
  if (!config.defaultApiKeys.qianwen && !config.defaultApiKeys.deepseek) {
    console.warn('警告: 默认 API 密钥未设置。请在 .env.local 文件中设置 NEXT_PUBLIC_DEFAULT_QIANWEN_API_KEY 或 NEXT_PUBLIC_DEFAULT_DEEPSEEK_API_KEY');
  }
} 