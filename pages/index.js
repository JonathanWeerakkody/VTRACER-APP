import { useState, useEffect } from 'react';
import Head from 'next/head';
import UploadArea from '../components/UploadArea';
import Settings from '../components/Settings';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [svg, setSvg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({
    mode: 'shape',
    tolerance: 5,
    colorQuantization: 8,
    layerMode: 'stacked',
    pathSimplification: 5,
    curveAccuracy: 5,
    strokeWidthDetection: false,
    backgroundTransparency: false
  });

  // Handle file upload
  const handleUpload = (uploadedFile) => {
    if (!uploadedFile) return;
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(uploadedFile);
    setFile(uploadedFile);
    setPreview(previewUrl);
    
    // Simulate processing
    setIsProcessing(true);
    setTimeout(() => {
      // For demo, we'll just use the same image as SVG preview
      // In real implementation, this would call the backend API
      setSvg(previewUrl);
      setIsProcessing(false);
    }, 1500);
  };

  // Handle settings change
  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    
    // Simulate reprocessing with new settings
    if (file) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>VTracer - Image to SVG Converter</title>
        <meta name="description" content="Convert your images to SVG with VTracer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">VTracer</h1>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Upload Area (show if no file) */}
        {!file && (
          <UploadArea onUpload={handleUpload} />
        )}
        
        {/* Preview and Settings */}
        {file && (
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Original</p>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                    <img 
                      src={preview} 
                      alt="Original" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Vector (SVG)</p>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                        <p className="mt-2 text-sm text-gray-500">Processing...</p>
                      </div>
                    ) : svg ? (
                      <img 
                        src={svg} 
                        alt="SVG Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <p className="text-gray-400">Processing image...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Settings */}
            <Settings 
              settings={settings} 
              onChange={handleSettingsChange} 
              isProcessing={isProcessing} 
            />
            
            {/* Download Button */}
            {svg && !isProcessing && (
              <div className="bg-white rounded-lg shadow p-4">
                <a 
                  href={svg} 
                  download="vectorized.svg"
                  className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Download SVG
                </a>
              </div>
            )}
            
            {/* Reset Button */}
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setSvg(null);
              }}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Upload a different image
            </button>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            Powered by VTracer
          </p>
        </div>
      </footer>
    </div>
  );
}
