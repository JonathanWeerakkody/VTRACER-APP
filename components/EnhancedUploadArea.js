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
        ${isDragActive ? 'drag-active bg-purple-50 border-purple-300' : 'border-dashed border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50'}
        ${isUploading ? 'opacity-75 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      {/* Floating animated file format icons */}
      <div className="floating-icon floating-icon-png absolute">
        <div className="text-xl font-bold text-purple-500 bg-white rounded-lg shadow-lg px-3 py-1">PNG</div>
      </div>
      <div className="floating-icon floating-icon-jpg absolute">
        <div className="text-xl font-bold text-indigo-500 bg-white rounded-lg shadow-lg px-3 py-1">JPG</div>
      </div>
      <div className="floating-icon floating-icon-gif absolute">
        <div className="text-xl font-bold text-pink-500 bg-white rounded-lg shadow-lg px-3 py-1">GIF</div>
      </div>
      <div className="floating-icon floating-icon-bmp absolute">
        <div className="text-xl font-bold text-blue-500 bg-white rounded-lg shadow-lg px-3 py-1">BMP</div>
      </div>
      <div className="floating-icon floating-icon-webp absolute">
        <div className="text-xl font-bold text-green-500 bg-white rounded-lg shadow-lg px-3 py-1">WEBP</div>
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
            <p className="mt-4 text-sm text-gray-600">
              <TranslatedText id="fileSupport" defaultText="Supports PNG, JPG, GIF, BMP, WEBP (max 10MB per file)" />
            </p>
            <p className="mt-2 text-xs text-gray-400">
              <TranslatedText id="uploadLimit" defaultText="Upload up to 10 images at once" />
            </p>
          </>
        )}
      </div>
      
      {/* Add CSS for floating icons animation */}
      <style jsx>{`
        .upload-area {
          position: relative;
          overflow: hidden;
          min-height: 300px;
          transition: all 0.3s ease;
        }
        
        .upload-area:hover {
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
        }
        
        .floating-icon {
          position: absolute;
          animation-duration: 8s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          z-index: 1;
        }
        
        .floating-icon-png {
          top: 20%;
          left: 15%;
          animation-name: float-1;
        }
        
        .floating-icon-jpg {
          top: 30%;
          right: 20%;
          animation-name: float-2;
        }
        
        .floating-icon-gif {
          bottom: 25%;
          left: 25%;
          animation-name: float-3;
        }
        
        .floating-icon-bmp {
          top: 50%;
          right: 15%;
          animation-name: float-4;
        }
        
        .floating-icon-webp {
          bottom: 20%;
          right: 30%;
          animation-name: float-5;
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, 15px) rotate(5deg); }
          50% { transform: translate(0, 25px) rotate(0deg); }
          75% { transform: translate(-15px, 10px) rotate(-5deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-15px, 10px) rotate(-5deg); }
          50% { transform: translate(0, 20px) rotate(0deg); }
          75% { transform: translate(15px, 5px) rotate(5deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(3deg); }
          50% { transform: translate(20px, 0) rotate(0deg); }
          75% { transform: translate(5px, 15px) rotate(-3deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, -10px) rotate(-3deg); }
          50% { transform: translate(-15px, 5px) rotate(0deg); }
          75% { transform: translate(-5px, -15px) rotate(3deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -5px) rotate(5deg); }
          50% { transform: translate(5px, -15px) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(-5deg); }
        }
        
        .drag-active {
          border: 2px dashed #8b5cf6 !important;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
}
