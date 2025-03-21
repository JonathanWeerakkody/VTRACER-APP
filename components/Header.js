import React from 'react';
import GoogleAd from './GoogleAd';

export default function Header() {
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
            <a href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
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
