import { useState } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function BatchDownloadPanel({ files, conversionStatus, onBatchConvert }) {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  
  // Count how many files are ready for download
  const readyFiles = files.filter(file => 
    file.svg && conversionStatus[file.id]?.status === 'completed'
  );
  
  // Check if all files are converted
  const allConverted = files.length > 0 && readyFiles.length === files.length;
  
  // Handle batch conversion
  const handleBatchConvert = () => {
    if (isConverting || allConverted) return;
    
    setIsConverting(true);
    setConversionProgress(0);
    
    // Call the parent's batch conversion function
    onBatchConvert(() => {
      // This callback will be called when conversion is complete
      setIsConverting(false);
      setConversionProgress(100);
    }, (progress) => {
      // This callback will be called with progress updates
      setConversionProgress(progress);
    });
  };
  
  // Create a zip file with all SVGs
  const handleBatchDownload = () => {
    if (!allConverted) return;
    
    // In a real implementation, this would create a zip file with all SVGs
    // For now, we'll just simulate a download by creating a text file with links
    const svgLinks = files.map(file => file.svg).join('\n');
    const blob = new Blob([svgLinks], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vectorise-me-all-svgs.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <TranslatedText id="batchOperations" defaultText="Batch Operations" />
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              <TranslatedText 
                id="filesReadyStatus" 
                defaultText={`${readyFiles.length} of ${files.length} files ready`} 
              />
            </p>
          </div>
          
          <button
            onClick={handleBatchConvert}
            disabled={isConverting || allConverted}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              (isConverting || allConverted) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isConverting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <TranslatedText id="converting" defaultText="Converting..." />
              </>
            )  : (
              <TranslatedText id="convertAll" defaultText="Convert All" />
            )}
          </button>
        </div>
        
        {isConverting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${conversionProgress}%` }}
            ></div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleBatchDownload}
            disabled={!allConverted}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              !allConverted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <TranslatedText id="downloadAllZip" defaultText="Download All (.zip) " />
          </button>
        </div>
      </div>
    </div>
  );
}
