// components/i18n/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define all supported languages
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'id', name: 'Indonesia (Indonesian)' },
  { code: 'it', name: 'Italiano (Italian)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ko', name: '한국어 (Korean)' },
  { code: 'pl', name: 'Polski (Polish)' },
  { code: 'pt', name: 'Português (Portuguese)' },
  { code: 'ru', name: 'Русский (Russian)' },
  { code: 'th', name: 'ไทย (Thai)' },
  { code: 'tr', name: 'Türkçe (Turkish)' },
  { code: 'vi', name: 'Tiếng Việt (Vietnamese)' },
  { code: 'zh-CN', name: '简体中文 (Chinese)' },
  { code: 'zh-TW', name: '繁體中文 (Chinese)' },
];

// Create the language context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize with browser language or default to English
  const [language, setLanguage] = useState('en');

  // Load saved language preference on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = languages.find(lang => lang.code === browserLang || lang.code.startsWith(browserLang));
      if (supportedLang) {
        setLanguage(supportedLang.code);
      }
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
