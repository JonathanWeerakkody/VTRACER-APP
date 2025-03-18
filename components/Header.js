// components/Header.js
import React from 'react';
import Link from 'next/link';
import LanguageSelector from './i18n/LanguageSelector';
import TranslatedText from './i18n/TranslatedText';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-gray-900 cursor-pointer">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Vectorise.Me</span>
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <LanguageSelector />
            <nav className="flex space-x-4">
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                <TranslatedText id="contact" defaultText="Contact Us" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
