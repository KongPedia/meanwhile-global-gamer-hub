import { I18nText } from '@/types/reports';
import { Language } from '@/contexts/LanguageContext';

/**
 * Get localized text from I18nText object or return string as-is
 */
export function getLocalizedText(text: string | I18nText, language: Language): string {
  if (typeof text === 'string') {
    return text;
  }
  return text[language] || text.en || text.ko || Object.values(text)[0] || '';
}
