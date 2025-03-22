// components/i18n/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define all supported languages
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'id', name: 'Indonesia' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'th', name: 'ไทย' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-tw', name: '繁體中文' },
  { code: 'ar', name: 'العربية' }
];

// Create the language context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize with browser language or default to English
  const [language, setLanguage] = useState('en');

  // Load saved language preference on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        // Try to detect browser language
        try {
          const browserLang = navigator.language.split('-')[0];
          const supportedLang = languages.find(lang => 
            lang.code === browserLang || 
            lang.code.startsWith(browserLang) ||
            (browserLang === 'zh' && (lang.code === 'zh' || lang.code === 'zh-tw'))
          );
          if (supportedLang) {
            setLanguage(supportedLang.code);
          }
        } catch (error) {
          console.error('Error detecting browser language:', error);
        }
      }
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', language);
    }
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
