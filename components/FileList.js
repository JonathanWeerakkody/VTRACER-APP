import { useCallback } from 'react';
import TranslatedText from './i18n/TranslatedText';
import GoogleAd from './GoogleAd';

export default function FileList({ files, onSelect, selectedFile, onPreview, conversionStatus, compact = false, onDelete }) {
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
                        <div className="text-xs text-gray-500">
                          {file.fileSize}
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
                        <div className="flex space-x-2">
                          {/* Preview Button */}
                          {status === 'completed' && (
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={(e) => handlePreview(e, file, 'svg')}
                            >
                              <TranslatedText id="preview" defaultText="Preview" />
                            </button>
                          )}
                          
                          {/* Delete Button */}
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={(e) => handleDelete(e, file)}
                          >
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
