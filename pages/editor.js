// pages/editor.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import UploadArea from '../components/UploadArea';
import FileList from '../components/FileList';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ConversionProgress from '../components/ConversionProgress';
import PreviewModal from '../components/PreviewModal';
import SettingsPanel from '../components/SettingsPanel';
import DownloadPanel from '../components/DownloadPanel';
import AdBlockerNotification from '../components/AdBlockerNotification';

export default function Editor() {
  const [sessionId, setSessionId] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState({});
  const [previewModal, setPreviewModal] = useState({ isOpen: false, image: null, title: '' });
  const [settings, setSettings] = useState({
    mode: 'shape',
    curveAccuracy: 4,
    colorQuantization: 6,
    pathSimplification: 8,
    strokeWidthDetection: false,
    backgroundTransparency: false,
  });
  
  // Handle file upload
  const handleUpload = async (uploadedFiles) => {
    if (uploadedFiles.length === 0) return;
    if (files.length + uploadedFiles.length > 10) {
      alert('You can only upload up to 10 images at once.');
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      
      // Process each file
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        
        // Create object URL for preview
        const preview = URL.createObjectURL(file);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate a random ID for demo purposes
        const imageId = 'img_' + Math.random().toString(36).substr(2, 9);
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        
        // If this is the first file, set the session ID
        if (!sessionId) {
          setSessionId(sessionId);
        }
        
        // Add file to list
        const newFile = {
          id: imageId,
          name: file.name,
          preview: preview,
          original: preview,
          svg: null,
          fileSize: null,
        };
        
        setFiles(prev => [...prev, newFile]);
        
        // Update conversion status
        setConversionStatus(prev => ({
          ...prev,
          [imageId]: { status: 'converting', progress: 0 }
        }));
        
        // If this is the first file, select it
        if (files.length === 0 && i === 0) {
          setSelectedFile(newFile);
          
          // Start conversion with progress simulation
          simulateConversion(sessionId, imageId, settings);
        }
      }
      
      // Complete upload progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset upload progress after a delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  // Simulate conversion progress
  const simulateConversion = async (sessionId, imageId, settings) => {
    // Start progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 1;
      if (progress > 95) {
        progress = 95;
        clearInterval(progressInterval);
      }
      
      setConversionStatus(prev => ({
        ...prev,
        [imageId]: { status: 'converting', progress }
      }));
    }, 300);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete progress
      clearInterval(progressInterval);
      
      // Update conversion status
      setConversionStatus(prev => ({
        ...prev,
        [imageId]: { status: 'completed', progress: 100 }
      }));
      
      // For demo purposes, use the same image as SVG preview
      // In a real implementation, this would be the actual SVG from the backend
      const svgUrl = files.find(f => f.id === imageId)?.preview;
      
      // Update files list
      setFiles(prev => prev.map(f => 
        f.id === imageId 
          ? {...f, svg: svgUrl, fileSize: 12345} // Mock file size
          : f
      ));
      
      // Update selected file if it's the one being processed
      if (selectedFile?.id === imageId) {
        setSelectedFile(prev => ({...prev, svg: svgUrl, fileSize: 12345}));
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      
      // Stop progress simulation
      clearInterval(progressInterval);
      
      // Update conversion status
      setConversionStatus(prev => ({
        ...prev,
        [imageId]: { status: 'error', progress: 0 }
      }));
      
      alert('Error converting image. Please try again.');
    }
  };
  
  // Handle file selection
  const handleSelectFile = (file) => {
    setSelectedFile(file);
    
    // If the file doesn't have an SVG preview yet, start conversion
    if (file && !file.svg) {
      simulateConversion('demo_session', file.id, settings);
    }
  };
  
  // Handle preview modal
  const handlePreview = (file) => {
    setPreviewModal({
      isOpen: true,
      image: file.svg || file.preview,
      title: file.svg ? 'SVG Preview' : 'Original Image'
    });
  };
  
  // Handle settings change
  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    
    // If there's a selected file, reconvert with new settings
    if (selectedFile?.id) {
      // Update conversion status
      setConversionStatus(prev => ({
        ...prev,
        [selectedFile.id]: { status: 'converting', progress: 0 }
      }));
      
      // Start conversion with new settings
      simulateConversion('demo_session', selectedFile.id, newSettings);
    }
  };
  
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>VTracer - Image to SVG Converter</title>
        <meta name="description" content="Convert your images to scalable vector graphics (SVG) with real-time customization." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900 cursor-pointer">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">VTracer</span>
              </span>
            </Link>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/editor" className="text-indigo-600 font-medium">Editor</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Upload Area (show if less than 10 files) */}
          {files.length < 10 && (
            <UploadArea 
              onUpload={handleUpload} 
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          )}
          
          {/* File List (show if files exist) */}
          {files.length > 0 && (
            <FileList 
              files={files} 
              onSelect={handleSelectFile} 
              selectedFile={selectedFile}
              onPreview={handlePreview}
              conversionStatus={conversionStatus}
            />
          )}
          
          {/* Before/After Slider */}
          {selectedFile && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Before & After Comparison</h3>
              <BeforeAfterSlider 
                originalImage={selectedFile.original} 
                svgImage={selectedFile.svg} 
                isProcessing={conversionStatus[selectedFile.id]?.status === 'converting'}
              />
            </div>
          )}
          
          {/* Conversion Progress */}
          {selectedFile && conversionStatus[selectedFile.id]?.status === 'converting' && (
            <ConversionProgress 
              progress={conversionStatus[selectedFile.id]?.progress || 0}
              status="Converting image to SVG..."
            />
          )}
          
          {/* Settings and Download */}
          {selectedFile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <SettingsPanel 
                  settings={settings} 
                  onChange={handleSettingsChange} 
                  isProcessing={conversionStatus[selectedFile.id]?.status === 'converting'}
                />
              </div>
              <div>
                <DownloadPanel 
                  svgUrl={selectedFile.svg} 
                  fileSize={selectedFile.fileSize} 
                  isReady={!!selectedFile.svg && conversionStatus[selectedFile.id]?.status === 'completed'} 
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Preview Modal */}
      <PreviewModal 
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, image: null, title: '' })}
        image={previewModal.image}
        title={previewModal.title}
      />
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} VTracer. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link href="/contact" className="text-sm text-indigo-600 hover:text-indigo-500">Contact Us</Link>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      <AdBlockerNotification />
    </div>
  );
}
