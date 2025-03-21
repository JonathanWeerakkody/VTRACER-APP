import React from 'react';
import GoogleAd from './GoogleAd';

export default function DownloadPanel({ svgUrl, fileSize, isReady }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          {/* Show a casual file size note if available */}
          {fileSize && (
            <p className="text-sm text-gray-500 mr-4">
              Your converted SVG is about {(fileSize / 1024).toFixed(1)} KB.
            </p>
          )}

          <a
            href={svgUrl}
            download="vectorise-me-converted.svg"
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              !isReady ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
            onClick={(e) => !isReady && e.preventDefault()}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download SVG
          </a>
        </div>
      </div>

      {/* Ad placement below download panel */}
      <GoogleAd 
        slot="2345678901" 
        format="fluid" 
        className="py-2 bg-gray-50 rounded-lg"
      />
    </div>
  );
}
