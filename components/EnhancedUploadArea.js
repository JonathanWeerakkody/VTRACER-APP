// components/EnhancedUploadArea.js
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import TranslatedText from './i18n/TranslatedText';

export default function EnhancedUploadArea({ onUpload, isUploading, uploadProgress }) {
  const [clipboardSupported, setClipboardSupported] = useState(false);
  
  useEffect(() => {
    // Check if clipboard API is supported
    setClipboardSupported(
      navigator && 
      navigator.clipboard && 
      typeof navigator.clipboard.read === 'function'
    );
  }, []);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (event) => {
      if (isUploading) return;
      
      const items = event.clipboardData?.items;
      if (!items) return;
      
      const imageItems = Array.from(items).filter(item => item.type.indexOf('image') !== -1);
      if (imageItems.length === 0) return;
      
      const files = imageItems.map(item => item.getAsFile()).filter(Boolean);
      if (files.length > 0) {
        onUpload(files);
        event.preventDefault();
      }
    };
    
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [onUpload, isUploading]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      onUpload(acceptedFiles);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp']
    },
    maxFiles: 10,
    maxSize: 10485760, // 10MB
    disabled: isUploading
  });

  return (
    <div 
      {...getRootProps()} 
      className={`upload-area w-full p-12 rounded-lg text-center cursor-pointer transition-all duration-300
        ${isDragActive ? 'drag-active' : ''}
        ${isUploading ? 'opacity-75 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      {/* Floating animated icons */}
      <div className="floating-icon floating-icon-1">
        <svg className="w-10 h-10 text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
        </svg>
      </div>
      <div className="floating-icon floating-icon-2">
        <svg className="w-8 h-8 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H5.5z"></path>
          <path d="M9 13h2v4H9v-4z"></path>
        </svg>
      </div>
      <div className="floating-icon floating-icon-3">
        <svg className="w-12 h-12 text-purple-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"></path>
        </svg>
      </div>
      <div className="floating-icon floating-icon-4">
        <svg className="w-9 h-9 text-indigo-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </div>
      
      <div className="flex flex-col items-center justify-center relative z-10">
        {isUploading ? (
          <div className="w-full">
            <svg 
              className="animate-spin h-10 w-10 text-indigo-500 mx-auto mb-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium mb-2">
              <TranslatedText id="uploading" defaultText="Uploading..." />
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{uploadProgress}% <TranslatedText id="complete" defaultText="complete" /></p>
          </div>
        ) : (
          <>
            <svg 
              className="w-16 h-16 mb-4 text-purple-500 transition-all duration-300 transform hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg font-medium text-gray-700">
              {isDragActive ? 
                <TranslatedText id="dropImagesHere" defaultText="Drop your images here" /> : 
                <TranslatedText id="dragDropImages" defaultText="Drag & drop your images here" />
              }
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <TranslatedText id="orClickToBrowse" defaultText="or click to browse" />
            </p>
            {clipboardSupported && (
              <div className="mt-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                <span className="font-mono bg-white px-1 rounded mr-1">Ctrl+V</span>
                <TranslatedText id="pasteFromClipboard" defaultText="to paste from clipboard" />
              </div>
            )}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">PNG</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">JPG</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">GIF</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">BMP</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">WEBP</span>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              <TranslatedText id="uploadLimit" defaultText="Upload up to 10 images at once (max 10MB each)" />
            </p>
          </>
        )}
      </div>
    </div>
  );
}
