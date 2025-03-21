import { useState, useCallback, useRef, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function BeforeAfterSlider({ originalImage, svgImage, isProcessing }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  
  const handleMouseDown = useCallback(() => {
    isDraggingRef.current = true;
  }, []);
  
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    // Calculate position as percentage
    let position = (mouseX / containerWidth) * 100;
    
    // Clamp position between 0 and 100
    position = Math.max(0, Math.min(100, position));
    
    setSliderPosition(position);
  }, []);
  
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);
  
  // Toggle zoom on image click
  const handleImageClick = () => {
    setZoomed(prev => !prev);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">
        <TranslatedText id="preview" defaultText="Preview" />
      </h3>
      
      <div 
        ref={containerRef}
        className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                <TranslatedText id="processing" defaultText="Processing..." />
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* SVG Image */}
            {svgImage && (
              <div 
                className="absolute inset-0 flex items-center justify-center"
                onClick={handleImageClick}
              >
                <img 
                  src={svgImage} 
                  alt="SVG" 
                  className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
                />
              </div>
            )}
            
            {/* Zoom instruction */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              <TranslatedText id="clickToZoom" defaultText={zoomed ? "Click to zoom out" : "Click to zoom in"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
