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
  
  // Handle preview
  const handlePreview = useCallback((file, type) => {
    setPreviewModal({
      isOpen: true,
      image: type === 'original' ? file.original : file.svg,
      title: `${file.name} (${type === 'original' ? 'Original' : 'SVG'})`
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
        <title>Vectorise.Me - Free Online Image to SVG Converter</title>
        <meta name="description" content="Convert your images to scalable vector graphics (SVG) instantly with our free online tool. Real-time preview and customization options." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
                <div className="sm:text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block"><TranslatedText id="heroTitle1" defaultText="Transform Images into" /></span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"><TranslatedText id="heroTitle2" defaultText="Scalable Vector Graphics" /></span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    <TranslatedText id="heroDescription" defaultText="Convert your images to SVG instantly with our free online tool. Get high-quality vector graphics with real-time customization options." />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              />
            )}
            
            {/* Before/After Slider */}
            {selectedFile && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  <TranslatedText id="beforeAfter" defaultText="Before & After Comparison" />
                </h3>
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
                status={<TranslatedText id="converting" defaultText="Converting image to SVG..." />}
              />
            )}
            
            {/* Settings and Download */}
            {selectedFile && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-2">
                  <EnhancedSettingsPanel 
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
        </div>
        
        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                <TranslatedText id="features" defaultText="Features" />
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
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
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      <TranslatedText id="feature2Title" defaultText="Real-Time Customization" />
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      <TranslatedText id="feature2Description" defaultText="Adjust settings and see changes in real-time. Fine-tune your SVG to perfection." />
                    </p>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <TranslatedText id="ctaTitle" defaultText="Start using Vectorise.Me today." />
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              <TranslatedText id="ctaDescription" defaultText="Convert your images to SVG with our free online tool. No registration required." />
            </p>
          </div>
        </div>
        
        {/* Preview Modal */}
        {previewModal.isOpen && (
          <PreviewModal 
            isOpen={previewModal.isOpen}
            onClose={()  => setPreviewModal({ isOpen: false, image: null, title: '' })}
            image={previewModal.image}
            title={previewModal.title}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
