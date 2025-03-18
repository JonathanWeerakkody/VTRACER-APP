import { useState, useCallback, useRef, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function BeforeAfterSlider({ originalImage, svgImage, isProcessing }) {
  const [sliderPosition, setSliderPosition] = useState(50);
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
  
  return (
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
      )  : (
        <>
          {/* Original Image */}
          <div className="absolute inset-0">
            {originalImage && (
              <img 
                src={originalImage} 
                alt="Original" 
                className="w-full h-full object-contain"
              />
            )}
          </div>
          
          {/* SVG Image (clipped) */}
          {svgImage && (
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={svgImage} 
                alt="SVG" 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Slider */}
          <div 
            className="absolute inset-y-0 w-1 bg-white shadow-md cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            <TranslatedText id="original" defaultText="Original" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            SVG
          </div>
        </>
      ) }
    </div>
  );
}
