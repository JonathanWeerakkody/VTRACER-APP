import { useState, useCallback, useRef, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';
import GoogleAd from './GoogleAd';

export default function BeforeAfterSlider({ originalImage, svgImage, isProcessing }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const sliderDraggingRef = useRef(false);
  const panningRef = useRef(false);
  const lastPanPositionRef = useRef({ x: 0, y: 0 });
  
  // Handle slider drag
  const handleSliderMouseDown = useCallback((e) => {
    e.stopPropagation();
    sliderDraggingRef.current = true;
  }, []);
  
  const handleMouseUp = useCallback(() => {
    sliderDraggingRef.current = false;
    panningRef.current = false;
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    // Handle slider dragging
    if (sliderDraggingRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      // Calculate position as percentage
      let position = (mouseX / containerWidth) * 100;
      
      // Clamp position between 0 and 100
      position = Math.max(0, Math.min(100, position));
      
      setSliderPosition(position);
    }
    
    // Handle panning when zoomed in
    if (panningRef.current && zoomLevel > 1) {
      const dx = e.clientX - lastPanPositionRef.current.x;
      const dy = e.clientY - lastPanPositionRef.current.y;
      
      setPanPosition(prev => {
        // Calculate boundaries to prevent panning outside the image
        const maxPanX = (containerRef.current?.offsetWidth || 0) * (zoomLevel - 1) / 2;
        const maxPanY = (containerRef.current?.offsetHeight || 0) * (zoomLevel - 1) / 2;
        
        const newX = Math.max(-maxPanX, Math.min(maxPanX, prev.x + dx));
        const newY = Math.max(-maxPanY, Math.min(maxPanY, prev.y + dy));
        
        return { x: newX, y: newY };
      });
      
      lastPanPositionRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [zoomLevel]);
  
  // Start panning
  const handleImageMouseDown = useCallback((e) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      panningRef.current = true;
      lastPanPositionRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [zoomLevel]);
  
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);
  
  // Handle zoom levels
  const handleImageClick = (e) => {
    if (sliderDraggingRef.current || panningRef.current) return;
    
    // Cycle through zoom levels: 1 -> 1.5 -> 2 -> 1
    setZoomLevel(prev => {
      const newZoom = prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1;
      
      // Reset pan position when zooming out
      if (newZoom === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
      
      return newZoom;
    });
  };
  
  // Reset zoom with double click
  const handleDoubleClick = (e) => {
    e.preventDefault();
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };
  
  // Zoom controls
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(3, prev + 0.5));
  };
  
  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => {
      const newZoom = Math.max(1, prev - 0.5);
      if (newZoom === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };
  
  const handleZoomReset = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          <TranslatedText id="preview" defaultText="Preview" />
        </h3>
        
        <div 
          ref={containerRef}
          className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden cursor-move"
          onMouseMove={handleMouseMove}
          onMouseDown={handleImageMouseDown}
          onDoubleClick={handleDoubleClick}
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
              {/* Original Image */}
              <div 
                className="absolute inset-0 transition-transform duration-200"
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transformOrigin: 'center'
                }}
                onClick={handleImageClick}
              >
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
                  <div
                    className="absolute inset-0 transition-transform duration-200"
                    style={{ 
                      transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                      transformOrigin: 'center',
                      width: `${100 / (sliderPosition / 100)}%`
                    }}
                    onClick={handleImageClick}
                  >
                    <img 
                      src={svgImage} 
                      alt="SVG" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              {/* Slider */}
              <div 
                className="absolute inset-y-0 w-1 bg-white shadow-md cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleSliderMouseDown}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
              
              {/* Zoom controls */}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button 
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded-md shadow-sm text-gray-700 transition-colors"
                  onClick={handleZoomIn}
                  title="Zoom In"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button 
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded-md shadow-sm text-gray-700 transition-colors"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                  </svg>
                </button>
                <button 
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded-md shadow-sm text-gray-700 transition-colors"
                  onClick={handleZoomReset}
                  title="Reset Zoom"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              
              {/* Instructions */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                <TranslatedText id="dragToCompare" defaultText="Drag to compare" />
              </div>
              
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                <TranslatedText id="clickToZoom" defaultText="Click to zoom" />
              </div>
              
              {/* Zoom level indicator */}
              {zoomLevel > 1 && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {Math.round(zoomLevel * 100)}%
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Ad placement below slider */}
      <GoogleAd 
        slot="3456789012" 
        format="fluid" 
        className="py-2 bg-gray-50 rounded-lg"
      />
    </div>
  );
}
