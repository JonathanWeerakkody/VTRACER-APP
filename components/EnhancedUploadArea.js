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
      className={`w-full p-12 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}
        ${isUploading ? 'opacity-75 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center">
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
              className="w-16 h-16 mb-4 text-gray-400" 
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
            <p className="text-lg font-medium">
              {isDragActive ? 
                <TranslatedText id="dropImagesHere" defaultText="Drop your images here" /> : 
                <TranslatedText id="dragDropImages" defaultText="Drag & drop your images here" />
              }
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <TranslatedText id="orClickToBrowse" defaultText="or click to browse" />
            </p>
            {clipboardSupported && (
              <p className="mt-2 text-sm text-indigo-600">
                <TranslatedText id="pasteFromClipboard" defaultText="You can also paste images from clipboard (Ctrl+V)" />
              </p>
            )}
            <p className="mt-4 text-xs text-gray-400">
              <TranslatedText id="fileSupport" defaultText="Supports PNG, JPG, GIF, BMP, TIFF, WEBP (max 10MB each)" />
            </p>
            <p className="mt-1 text-xs text-gray-400">
              <TranslatedText id="uploadLimit" defaultText="Upload up to 10 images at once" />
            </p>
          </>
        )}
      </div>
    </div>
  );
}
