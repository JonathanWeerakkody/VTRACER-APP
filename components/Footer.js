import React from 'react';
import GoogleAd from './GoogleAd';

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      {/* Top ad banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <GoogleAd 
          slot="4567890123" 
          format="horizontal" 
          className="py-2 bg-white rounded-lg shadow-sm"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vectorise.Me</h3>
            <p className="text-gray-600 mb-4">
              Free online tool to convert raster images to scalable vector graphics (SVG).
            </p>
            <p className="text-gray-600">
              © {new Date().getFullYear()} JonkaryStudio. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-indigo-600 hover:text-indigo-800">Home</a>
              </li>
              <li>
                <a href="/faq" className="text-indigo-600 hover:text-indigo-800">FAQ</a>
              </li>
              <li>
                <a href="/contact" className="text-indigo-600 hover:text-indigo-800">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
              </li>
              <li>
                <a href="/cookies" className="text-indigo-600 hover:text-indigo-800">Cookie Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
