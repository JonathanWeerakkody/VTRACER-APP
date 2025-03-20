import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TranslatedText from './i18n/TranslatedText';

export default function PreviewModal({ isOpen, onClose, image, settings, originalImage }) {
  const cancelButtonRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(image);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Update preview image when settings change or when modal opens
  useEffect(() => {
    if (isOpen && originalImage && settings) {
      setIsLoading(true);
      
      // In a real implementation, this would call the actual conversion API with the settings.
      // For now, we'll simulate a delay and just use the provided image.
      const timer = setTimeout(() => {
        setPreviewImage(image);
        setIsLoading(false);
        setZoomed(false); // Reset zoom when image updates
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, settings, originalImage, image]);
  
  // Toggle zoom on image click
  const handleImageClick = () => {
    setZoomed(prev => !prev);
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
              {/* Removed the header/Title for a clean preview */}
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-[70vh]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : (
                    <img 
                      src={previewImage} 
                      alt="Preview"
                      onClick={handleImageClick}
                      className={`w-full h-auto max-h-[70vh] object-contain transition-transform duration-300 ease-in-out ${zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
                    />
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    <TranslatedText 
                      id="previewNote" 
                      defaultText="This is a preview based on your current settings. The final SVG may vary slightly." 
                    />
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Click the image to {zoomed ? 'zoom out' : 'zoom in'}.
                  </p>
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
