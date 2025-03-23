import React, { useState, useEffect } from 'react';
import GoogleAd from './GoogleAd';
import { useRouter } from 'next/router';
import { translations } from './i18n/translations';

export default function Header() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // List of supported languages
  const languages = [
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
  
  // Handle language change
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsDropdownOpen(false);
    // Refresh the page to apply language change
    router.reload();
  };
  
  // Load preferred language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <header className="bg-white shadow-sm">
      {/* Language selector at the very top */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-1">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out"
                aria-label="Select language"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.027 7.232A4.5 4.5 0 017.5 5.5h5a4.5 4.5 0 014.5 4.5v.5h-1.5v-.5a3 3 0 00-3-3h-5a3 3 0 00-3 3v.5H3v-.5c0-.583.103-1.14.292-1.657.138-.376.313-.72.52-1.033.212-.32.466-.602.754-.837a4.5 4.5 0 01-.539 1.759zM7.5 9a2 2 0 100-4 2 2 0 000 4zm9 1.5a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  <path d="M2 12.5h16v1H2v-1z" />
                  <path d="M2 14.5h16v1H2v-1z" />
                  <path d="M2 16.5h16v1H2v-1z" />
                </svg>
                <span className="mr-1 font-medium">{languages.find(lang => lang.code === language)?.name || 'English'}</span>
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                        language === lang.code ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Vectorise.Me
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Top ad banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <GoogleAd 
          slot="5678901234" 
          format="horizontal" 
          className="py-2 bg-gray-50 rounded-lg"
        />
      </div>
    </header>
  );
}
