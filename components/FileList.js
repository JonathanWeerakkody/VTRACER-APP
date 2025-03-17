// components/FileList.js
import React from 'react';

export default function FileList({ files, onSelect, selectedFile, onPreview, conversionStatus }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Uploaded Images ({files.length}/10)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {files.map((file) => {
          const isConverting = conversionStatus[file.id]?.status === 'converting';
          const isConverted = conversionStatus[file.id]?.status === 'completed';
          const progress = conversionStatus[file.id]?.progress || 0;
          
          return (
            <div 
              key={file.id} 
              className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all
                ${selectedFile?.id === file.id ? 'ring-2 ring-indigo-500 border-transparent' : 'border-gray-200 hover:border-indigo-300'}
              `}
            >
              <div 
                className="aspect-w-1 aspect-h-1 group"
                onClick={() => onSelect(file)}
              >
                <img 
                  src={file.preview} 
                  alt={file.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Conversion Status Overlay */}
                {isConverting && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-2">
                      <svg className="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                        <div 
                          className="bg-white h-1.5 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{progress}%</span>
                    </div>
                  </div>
                ) }
                
                {/* Preview Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(file);
                    }}
                    className="bg-white rounded-full p-2 shadow-lg"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
                
                {/* Converted Badge */}
                {isConverted && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Converted
                    </span>
                  </div>
                ) }
              </div>
              <div className="p-2 text-xs truncate">{file.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
