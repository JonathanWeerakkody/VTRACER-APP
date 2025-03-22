import { useCallback } from 'react';
import TranslatedText from './i18n/TranslatedText';
import GoogleAd from './GoogleAd';

export default function FileList({ files, onSelect, selectedFile, onPreview, onConvert, conversionStatus, compact = false, onDelete }) {
  const handleSelect = useCallback((file) => {
    onSelect(file);
  }, [onSelect]);
  
  const handlePreview = useCallback((e, file, type) => {
    e.stopPropagation();
    onPreview(file, type);
  }, [onPreview]);
  
  const handleDelete = useCallback((e, file) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(file);
    }
  }, [onDelete]);
  
  const handleConvert = useCallback((e, file) => {
    e.stopPropagation();
    if (onConvert) {
      onConvert(file);
    }
  }, [onConvert]);
  
  return (
    <div className="space-y-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {files.map(file => {
            const isSelected = selectedFile && selectedFile.id === file.id;
            const status = conversionStatus[file.id]?.status || 'pending';
            const progress = conversionStatus[file.id]?.progress || 0;
            
            return (
              <li key={file.id} className={`${isSelected ? 'bg-indigo-50' : ''}`}>
                <div 
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelect(file)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={file.preview} 
                          alt={file.name}
                          className="h-12 w-12 object-cover"
                        />
                      </div>
                      
                      {/* File Info */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-indigo-600 truncate">
                          {file.name}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status and Actions */}
                    <div className="flex items-center space-x-2">
                      {/* Status */}
                      {status === 'converting' ? (
                        <div className="flex items-center">
                          <div className="mr-2 text-xs text-gray-500">{progress}%</div>
                          <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      ) : status === 'completed' ? (
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">
                          <TranslatedText id="pending" defaultText="Pending" />
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      {!compact && (
                        <div className="flex space-x-3">
                          {/* Preview Button - Always show */}
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={(e) => handlePreview(e, file, status === 'completed' ? 'svg' : 'original')}
                          >
                            <svg className="mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <TranslatedText id="preview" defaultText="Preview" />
                          </button>
                          
                          {/* Convert Button - Only show if not completed */}
                          {status !== 'completed' && status !== 'converting' && (
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={(e) => handleConvert(e, file)}
                            >
                              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <TranslatedText id="convert" defaultText="Convert" />
                            </button>
                          )}
                          
                          {/* Delete Button */}
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={(e) => handleDelete(e, file)}
                          >
                            <svg className="mr-2 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <TranslatedText id="delete" defaultText="Delete" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Ad placement after file list */}
      <GoogleAd 
        slot="1234567890" 
        format="fluid" 
        className="mt-4 py-2 bg-gray-50 rounded-lg"
      />
    </div>
  );
}
