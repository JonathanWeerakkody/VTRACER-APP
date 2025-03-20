// components/Footer.js
import React from 'react';
import Link from 'next/link';
import TranslatedText from './i18n/TranslatedText';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Vectorise.Me. <TranslatedText id="copyright" defaultText="All rights reserved." />
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/contact" className="text-sm text-indigo-600 hover:text-indigo-500">
              <TranslatedText id="contact" defaultText="Contact Us" />
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              <TranslatedText id="privacy" defaultText="Privacy Policy" />
            </Link>
            <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-700">
              <TranslatedText id="cookies" defaultText="Cookie Policy" />
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              <TranslatedText id="terms" defaultText="Terms of Service" />
            </Link>
            <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-700">
              <TranslatedText id="faq" defaultText="FAQ" />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <TranslatedText id="freeService" defaultText="This service is completely free and supported by ad revenue." />
        </div>
        {/* Personal contact information removed as requested */}
      </div>
    </footer>
  );
}
