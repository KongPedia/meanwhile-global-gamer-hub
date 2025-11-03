// @refresh reset
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es';

interface Messages {
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  messages: Messages;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Supported languages
const SUPPORTED_LANGUAGES: Language[] = ['ko', 'en', 'ja', 'zh', 'es'];

// Export function to get supported language codes
export const getSupportedLanguageCodes = (): Language[] => {
  return SUPPORTED_LANGUAGES;
};

// Function to detect browser language
export function isSupportedLangCode(code: string | null | undefined): code is Language {
  if (!code) return false;
  return SUPPORTED_LANGUAGES.includes(code as Language);
}

export const detectBrowserLanguage = (): Language => {
  // Get browser language preferences
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  
  // Extract language code (e.g., 'ko-KR' -> 'ko')
  const langCode = browserLang.toLowerCase().split('-')[0];
  // Check if detected language is supported via translations keys
  if (isSupportedLangCode(langCode)) {
    return langCode as Language;
  }
  
  // Fallback logic based on region
  const region = browserLang.toLowerCase().split('-')[1];
  
  if (region) {
    // Asian regions default to appropriate languages
    if (['kr', 'kp'].includes(region)) return 'ko';
    if (['jp'].includes(region)) return 'ja';
    if (['cn', 'tw', 'hk', 'mo'].includes(region)) return 'zh';
    if (['es', 'mx', 'ar', 'co', 've', 'pe', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'gq'].includes(region)) return 'es';
  }
  
  // Default to English for unsupported languages
  return 'en';
};

// Load messages dynamically from YAML files
const loadMessages = async (lang: Language, namespaces: string[] = ['common', 'landing', 'reports']): Promise<Messages> => {
  const messages: Messages = {};
  
  for (const ns of namespaces) {
    try {
      const module = await import(`../i18n/${lang}/${ns}.yaml`);
      messages[ns] = module.default || module;
    } catch (error) {
      console.warn(`Failed to load ${lang}/${ns}.yaml:`, error);
      // Fallback to English if available
      if (lang !== 'en') {
        try {
          const fallbackModule = await import(`../i18n/en/${ns}.yaml`);
          messages[ns] = fallbackModule.default || fallbackModule;
        } catch (fallbackError) {
          console.error(`Failed to load fallback en/${ns}.yaml:`, fallbackError);
        }
      }
    }
  }
  
  return messages;
};

// Translation function with variable substitution and English fallback
const translateKey = (messages: Messages, key: string, vars?: Record<string, string>, currentLang?: Language): string => {
  // Parse key path like 'landing.hero.title' or 'common.game.all'
  const parts = key.split('.');
  let value: any = messages;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      // Key not found - try English fallback if not already using English
      if (currentLang && currentLang !== 'en') {
        console.warn(`Translation key not found for ${currentLang}: ${key}, falling back to English`);
        // Try to get English value from messages.en if available
        const enValue = getEnglishFallback(key, parts);
        if (enValue) return enValue;
      }
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  // If value is not a string, return the key
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string for key: ${key}`);
    return key;
  }
  
  // Convert \n to actual newline characters
  let result = value.replace(/\\n/g, '\n');
  
  // Variable substitution: replace {varName} with vars.varName
  if (vars) {
    result = result.replace(/\{(\w+)\}/g, (match, varName) => {
      return vars[varName] !== undefined ? vars[varName] : match;
    });
  }
  
  return result;
};

// Helper function to get English fallback value
const getEnglishFallback = (key: string, parts: string[]): string | null => {
  // This is a simple fallback - in production you might want to load English messages
  // For now, return null and let the key be displayed
  return null;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage first
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (isSupportedLangCode(savedLanguage)) {
      return savedLanguage;
    }
    // Otherwise detect from browser
    return detectBrowserLanguage();
  });
  
  const [messages, setMessages] = useState<Messages>({});
  const [loading, setLoading] = useState(true);
  
  // Load messages when language changes
  useEffect(() => {
    let isMounted = true;
    
    const loadLanguageMessages = async () => {
      setLoading(true);
      const newMessages = await loadMessages(language);
      
      if (isMounted) {
        setMessages(newMessages);
        setLoading(false);
      }
    };
    
    loadLanguageMessages();
    
    return () => {
      isMounted = false;
    };
  }, [language]);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = useCallback((key: string, vars?: Record<string, string>): string => {
    if (loading) {
      return key;
    }
    return translateKey(messages, key, vars, language);
  }, [loading, messages, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, messages, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
