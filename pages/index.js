// pages/index.js
import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdBlockerNotification from '../components/AdBlockerNotification';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TranslatedText from '../components/i18n/TranslatedText';
import { useLanguage } from '../components/i18n/LanguageContext';
import EnhancedUploadArea from '../components/EnhancedUploadArea';
import FileList from '../components/FileList';
import EnhancedSettingsPanel from '../components/EnhancedSettingsPanel';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ConversionProgress from '../components/ConversionProgress';
import DownloadPanel from '../components/DownloadPanel';
import PreviewModal from '../components/PreviewModal';
import BatchDownloadPanel from '../components/BatchDownloadPanel';
import ExampleConversions from '../components/ExampleConversions';

export default function Home() {
  const router = useRouter();
  const { language } = useLanguage();
  
  // State for file handling
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState({});
  const [previewModal, setPreviewModal] = useState({ isOpen: false, image: null, title: '' });
  
  // Settings state
  const [settings, setSettings] = useState({
    mode: 'shape',
    tolerance: 3,
    colorQuantization: 8,
    layerMode: 'stacked',
    pathSimplification: 5,
    curveAccuracy: 5,
    strokeWidthDetection: true,
    backgroundTransparency: false
  });
  
  // Handle file upload
  const handleUpload = useCallback((acceptedFiles) => {
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        // Process files
        const newFiles = acceptedFiles.map(file => {
          const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          return {
            id,
            name: file.name,
            size: file.size,
            type: file.type,
            original: URL.createObjectURL(file),
            preview: URL.createObjectURL(file),
            fileSize: (file.size / 1024).toFixed(2) + ' KB'
          };
        });
        
        setFiles(prev => [...prev, ...newFiles]);
        
        // Select the first file if none is selected
        if (!selectedFile) {
          setSelectedFile(newFiles[0]);
          simulateConversion(newFiles[0].id);
        }
      }
    }, 50);
  }, [selectedFile]);
  
  // Handle file selection
  const handleSelectFile = useCallback((file) => {
    setSelectedFile(file);
    
    // Start conversion if not already done
    if (!conversionStatus[file.id] || conversionStatus[file.id].status !== 'completed') {
      simulateConversion(file.id);
    }
  }, [conversionStatus]);
  
  // Handle file deletion
  const handleDeleteFile = useCallback((file) => {
    // Remove file from state
    setFiles(prev => prev.filter(f => f.id !== file.id));
    
    // If the deleted file was selected, select another file or clear selection
    if (selectedFile && selectedFile.id === file.id) {
      const remainingFiles = files.filter(f => f.id !== file.id);
      if (remainingFiles.length > 0) {
        setSelectedFile(remainingFiles[0]);
      } else {
        setSelectedFile(null);
      }
    }
    
    // Clean up object URLs
    if (file.preview) URL.revokeObjectURL(file.preview);
    if (file.original) URL.revokeObjectURL(file.original);
    if (file.svg) URL.revokeObjectURL(file.svg);
    
    // Remove conversion status
    setConversionStatus(prev => {
      const newStatus = {...prev};
      delete newStatus[file.id];
      return newStatus;
    });
  }, [files, selectedFile]);
  
  // Handle preview
  const handlePreview = useCallback((file, type) => {
    setPreviewModal({
      isOpen: true,
      image: file.svg,
      title: `${file.name} (SVG)`
    });
  }, []);
  
  // Handle settings change
  const handleSettingsChange = useCallback((newSettings) => {
    setSettings(newSettings);
    
    if (selectedFile) {
      // Start conversion with new settings
      simulateConversion(selectedFile.id, newSettings);
    }
  }, [selectedFile]);
  
  // Simulate conversion
  const simulateConversion = useCallback((fileId, customSettings = null) => {
    setConversionStatus(prev => ({
      ...prev,
      [fileId]: { status: 'converting', progress: 0 }
    }));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      setConversionStatus(prev => ({
        ...prev,
        [fileId]: { status: 'converting', progress }
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Update file with SVG result
        setFiles(prev => prev.map(file => {
          if (file.id === fileId) {
            return {
              ...file,
              svg: file.original // In a real app, this would be the converted SVG
            };
          }
          return file;
        }));
        
        setConversionStatus(prev => ({
          ...prev,
          [fileId]: { status: 'completed', progress: 100 }
        }));
      }
    }, 50);
  }, []);
  
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
        if (file.original) URL.revokeObjectURL(file.original);
        if (file.svg) URL.revokeObjectURL(file.svg);
      });
    };
  }, [files]);
  
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Vectorise.Me - Best Free Online Image to Vector Converter | PNG to SVG | Vectorizer Tool</title>
        <meta name="description" content="Transform images to scalable vector graphics instantly with our free online vectorizer. Convert PNG, JPG, and photos to SVG with advanced customization. Best raster to vector converter with real-time preview." />
        <meta name="keywords" content="vectorize image, image to vector, raster to vector, png to svg, jpg to svg, photo to vector, free vectorizer, vector conversion, svg converter, vectorize online, image vectorization" />
        <meta property="og:title" content="Vectorise.Me - Free Online Image to Vector Converter" />
        <meta property="og:description" content="Transform any image to scalable vector graphics (SVG) with our free online vectorizer tool. Best PNG to SVG converter with real-time preview." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vectorise.Me - Free Image Vectorizer Tool" />
        <meta name="twitter:description" content="Convert photos, PNG, JPG to SVG vectors instantly. Free online raster to vector converter with customization options." />
        <link rel="canonical" href="https://vectorise.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
              <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
                <div className="sm:text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block"><TranslatedText id="heroTitle1" defaultText="Transform Images into" /></span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"><TranslatedText id="heroTitle2" defaultText="Stunning Vector Graphics" /></span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    <TranslatedText id="heroDescription" defaultText="Convert images to SVG instantly with our free online vectorizer." />
                  </p>
                  {/* Buttons removed as requested */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Area - moved higher as requested */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-8">
            {/* Upload Area (show if less than 10 files) */}
            {files.length < 10 && (
              <EnhancedUploadArea 
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
                onDelete={handleDeleteFile}
              />
            )}
            
            {/* Settings Panel (show if files exist) */}
            {files.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {selectedFile && (
                    <div className="bg-white shadow rounded-lg p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        <TranslatedText id="preview" defaultText="Preview" />
                      </h2>
                      <BeforeAfterSlider 
                        before={selectedFile.original} 
                        after={selectedFile.svg || selectedFile.original} 
                      />
                    </div>
                  )}
                </div>
                <div className="lg:col-span-1">
                  <EnhancedSettingsPanel 
                    settings={settings} 
                    onChange={handleSettingsChange} 
                  />
                </div>
              </div>
            )}
            
            {/* Conversion Progress (show if converting) */}
            {selectedFile && conversionStatus[selectedFile.id]?.status === 'converting' && (
              <ConversionProgress progress={conversionStatus[selectedFile.id].progress} />
            )}
            
            {/* Download Panel (show if conversion completed) */}
            {selectedFile && conversionStatus[selectedFile.id]?.status === 'completed' && (
              <DownloadPanel file={selectedFile} />
            )}
            
            {/* Batch Download Panel (show if multiple files converted) */}
            {files.length > 1 && Object.values(conversionStatus).some(status => status.status === 'completed') && (
              <BatchDownloadPanel files={files.filter(file => conversionStatus[file.id]?.status === 'completed')} />
            )}
          </div>
        </div>
        
        {/* Example Conversions */}
        <div className="bg-gray-50 py-12 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExampleConversions />
          </div>
        </div>
        
        {/* Features Section */}
        <div id="features" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">
                <TranslatedText id="features" defaultText="Features" />
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <TranslatedText id="featuresTitle" defaultText="Everything you need for perfect SVGs" />
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                <TranslatedText id="featuresDescription" defaultText="Our powerful conversion tool gives you complete control over your vector graphics." />
              </p>
            </div>
            
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText id="feature1Title" defaultText="Instant Conversion" />
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      <TranslatedText id="feature1Description" defaultText="Upload your image and get an SVG preview instantly. No waiting, no processing delays." />
                    </p>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText id="feature2Title" defaultText="Real-time Customization" />
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      <TranslatedText id="feature2Description" defaultText="Adjust settings and see changes in real-time. Tweak your SVG to perfection." />
                    </p>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText id="feature3Title" defaultText="High-Quality Results" />
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      <TranslatedText id="feature3Description" defaultText="Get clean, optimized SVGs that scale perfectly for any use case." />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-purple-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <TranslatedText id="ctaTitle" defaultText="Start using Vectorise.Me today." />
            </h2>
            <p className="mt-4 text-lg leading-6 text-purple-200">
              <TranslatedText id="ctaDescription" defaultText="Convert your images to SVG with our free online tool. No registration required." />
            </p>
          </div>
        </div>
        
        {/* Preview Modal */}
        {previewModal.isOpen && (
          <PreviewModal 
            isOpen={previewModal.isOpen} 
            onClose={() => setPreviewModal({ isOpen: false, image: null, title: '' })}
            image={previewModal.image}
            title={previewModal.title}
          />
        )}
      </main>
      
      <Footer />
      
      {/* Ad Blocker Notification */}
      <AdBlockerNotification />
    </div>
  );
}
