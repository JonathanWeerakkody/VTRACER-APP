// components/BeforeAfterSlider.js
import { useState, useRef, useEffect } from 'react';

export default function BeforeAfterSlider({ originalImage, svgImage, isProcessing }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!originalImage || !svgImage) {
    return (
      <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Upload an image to see comparison</p>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Processing image...</p>
        </div>
      </div>
    ) ;
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden"
      onTouchMove={handleTouchMove}
    >
      {/* Original Image (Background) */}
      <div className="absolute inset-0">
        <img 
          src={originalImage} 
          alt="Original" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* SVG Image (Foreground with clip-path) */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <img 
          src={svgImage} 
          alt="SVG" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        Vector
      </div>
    </div>
  ) ;
}
