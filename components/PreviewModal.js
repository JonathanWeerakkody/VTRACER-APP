import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TranslatedText from './i18n/TranslatedText';

export default function PreviewModal({ isOpen, onClose, image, settings, originalImage }) {
  const cancelButtonRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(image);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Update preview image when settings change or when modal opens
  useEffect(() => {
    if (isOpen && settings) {
      setIsLoading(true);
      
      // In a real implementation, this would call the actual conversion API with the settings.
      // For now, we'll simulate a delay and just use the provided image.
      const timer = setTimeout(() => {
        setPreviewImage(image);
        setIsLoading(false);
        resetZoom();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, settings, image]);
  
  // Reset zoom and position when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetZoom();
    }
  }, [isOpen]);

  // Reset zoom and position
  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle zoom in
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  // Handle zoom out
  const zoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.25, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
    e.preventDefault();
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle double click to toggle between zoom levels
  const handleDoubleClick = () => {
    if (zoomLevel > 1) {
      resetZoom();
    } else {
      setZoomLevel(2);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Trick for centering the modal */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    <TranslatedText id="preview" defaultText="Preview" />
                  </Dialog.Title>
                  
                  <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden relative">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-[70vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                      </div>
                    ) : (
                      <div 
                        className="h-[70vh] overflow-hidden relative"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                      >
                        <img 
                          ref={imageRef}
                          src={previewImage} 
                          alt="Preview"
                          onDoubleClick={handleDoubleClick}
                          className="w-full h-full object-contain transition-transform duration-200"
                          style={{ 
                            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                            transformOrigin: 'center center'
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Zoom controls */}
                    {!isLoading && (
                      <div className="absolute bottom-4 right-4 flex space-x-2">
                        <button 
                          onClick={zoomOut} 
                          disabled={zoomLevel <= 1}
                          className={`p-2 rounded-full bg-white shadow-md ${zoomLevel <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                          aria-label="Zoom out"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={resetZoom} 
                          disabled={zoomLevel === 1}
                          className={`p-2 rounded-full bg-white shadow-md ${zoomLevel === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                          aria-label="Reset zoom"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={zoomIn} 
                          disabled={zoomLevel >= 3}
                          className={`p-2 rounded-full bg-white shadow-md ${zoomLevel >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                          aria-label="Zoom in"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <TranslatedText 
                        id="previewNote" 
                        defaultText="This is a preview of your converted SVG. The final result may vary slightly." 
                      />
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      <TranslatedText 
                        id="zoomInstructions" 
                        defaultText="Double-click to zoom in/out. Use mouse wheel to adjust zoom level. When zoomed in, drag to pan." 
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  <TranslatedText id="close" defaultText="Close" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
