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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Vectorise.Me
              </span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <span className="mr-1">{languages.find(lang => lang.code === language)?.name || 'English'}</span>
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                        language === lang.code ? 'bg-gray-100' : ''
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Vectorise.Me
              </span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <span className="mr-1">{languages.find(lang => lang.code === language)?.name || 'English'}</span>
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                        language === lang.code ? 'bg-gray-100' : ''
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
