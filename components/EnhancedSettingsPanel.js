import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function EnhancedSettingsPanel({ settings, onChange, isProcessing, onApplyToAll }) {
  // Local state to track settings before applying
  const [localSettings, setLocalSettings] = useState(settings);
  
  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    
    const newSettings = {
      ...localSettings,
      [name]: newValue
    };
    
    setLocalSettings(newSettings);
    onChange(newSettings);
  };
  
  // Handle mode change - updates visible settings
  const handleModeChange = (mode) => {
    const newSettings = {
      ...localSettings,
      colorMode: mode
    };
    
    setLocalSettings(newSettings);
    onChange(newSettings);
  };
  
  // Handle apply to all button click
  const handleApplyToAll = () => {
    if (onApplyToAll) {
      onApplyToAll();
    }
  };
  
  // Determine which settings to show based on color mode
  const showBWSettings = localSettings.colorMode === 'bw';
  const showGrayscaleSettings = localSettings.colorMode === 'grayscale';
  const showColorSettings = localSettings.colorMode === 'color';
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">
          <TranslatedText id="settings" defaultText="Settings" />
        </h2>
        
        {onApplyToAll && (
          <button
            onClick={handleApplyToAll}
            disabled={isProcessing}
            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <TranslatedText id="applyToAll" defaultText="Apply to All Images" />
          </button>
        )}
      </div>
      
      {/* Color Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="outputMode" defaultText="Output Mode" />
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleModeChange('bw')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              localSettings.colorMode === 'bw'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TranslatedText id="bwMode" defaultText="B/W" />
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('grayscale')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              localSettings.colorMode === 'grayscale'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TranslatedText id="grayscaleMode" defaultText="Grayscale" />
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('color')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              localSettings.colorMode === 'color'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TranslatedText id="colorMode" defaultText="Color" />
          </button>
        </div>
      </div>
      
      {/* Layer Mode */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="layerMode" defaultText="Layer Mode" />
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleChange({ target: { name: 'layerMode', value: 'stacked' } })}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              localSettings.layerMode === 'stacked'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TranslatedText id="stackedMode" defaultText="Stacked" />
          </button>
          <button
            type="button"
            onClick={() => handleChange({ target: { name: 'layerMode', value: 'cutout' } })}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              localSettings.layerMode === 'cutout'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TranslatedText id="cutoutMode" defaultText="Cutout" />
          </button>
        </div>
      </div>
      
      {/* Dynamic settings based on color mode */}
      {showBWSettings && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="threshold" defaultText="Threshold" />
            <span className="ml-1 text-gray-500">({localSettings.threshold})</span>
          </label>
          <input
            type="range"
            name="threshold"
            min="0"
            max="255"
            value={localSettings.threshold}
            onChange={handleChange}
            disabled={isProcessing}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>128</span>
            <span>255</span>
          </div>
        </div>
      )}
      
      {showGrayscaleSettings && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText id="grayLevels" defaultText="Number of Gray Levels" />
              <span className="ml-1 text-gray-500">({localSettings.colorQuantization})</span>
            </label>
            <input
              type="range"
              name="colorQuantization"
              min="2"
              max="16"
              value={localSettings.colorQuantization}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2</span>
              <span>8</span>
              <span>16</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText id="gradientStep" defaultText="Gradient Step" />
              <span className="ml-1 text-gray-500">({localSettings.gradientStep})</span>
            </label>
            <input
              type="range"
              name="gradientStep"
              min="1"
              max="32"
              value={localSettings.gradientStep}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>16</span>
              <span>32</span>
            </div>
          </div>
        </>
      )}
      
      {showColorSettings && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText id="colorQuantization" defaultText="Number of Colors" />
              <span className="ml-1 text-gray-500">({localSettings.colorQuantization})</span>
            </label>
            <input
              type="range"
              name="colorQuantization"
              min="2"
              max="64"
              value={localSettings.colorQuantization}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText id="colorPrecision" defaultText="Color Precision" />
              <span className="ml-1 text-gray-500">({localSettings.colorPrecision})</span>
            </label>
            <input
              type="range"
              name="colorPrecision"
              min="1"
              max="16"
              value={localSettings.colorPrecision}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>8</span>
              <span>16</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText id="gradientStep" defaultText="Gradient Step" />
              <span className="ml-1 text-gray-500">({localSettings.gradientStep})</span>
            </label>
            <input
              type="range"
              name="gradientStep"
              min="1"
              max="32"
              value={localSettings.gradientStep}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>16</span>
              <span>32</span>
            </div>
          </div>
        </>
      )}
      
      {/* Common settings for all modes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="filterSpeckle" defaultText="Filter Speckle" />
          <span className="ml-1 text-gray-500">({localSettings.filterSpeckle})</span>
        </label>
        <input
          type="range"
          name="filterSpeckle"
          min="0"
          max="10"
          value={localSettings.filterSpeckle}
          onChange={handleChange}
          disabled={isProcessing}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="pathSimplification" defaultText="Path Simplification" />
          <span className="ml-1 text-gray-500">({localSettings.pathSimplification})</span>
        </label>
        <input
          type="range"
          name="pathSimplification"
          min="0"
          max="10"
          value={localSettings.pathSimplification}
          onChange={handleChange}
          disabled={isProcessing}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
      
      {/* Advanced Settings Section */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer">
            <h3 className="text-sm font-medium text-gray-700">
              <TranslatedText id="advancedSettings" defaultText="Advanced Settings" />
            </h3>
            <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          
          <div className="mt-4 space-y-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TranslatedText id="curveFitting" defaultText="Curve Fitting" />
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={()  => handleChange({ target: { name: 'curveFitting', value: 'pixel' } })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    localSettings.curveFitting === 'pixel'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <TranslatedText id="pixelMode" defaultText="Pixel" />
                </button>
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'curveFitting', value: 'polygon' } })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    localSettings.curveFitting === 'polygon'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <TranslatedText id="polygonMode" defaultText="Polygon" />
                </button>
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'curveFitting', value: 'spline' } })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    localSettings.curveFitting === 'spline'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <TranslatedText id="splineMode" defaultText="Spline" />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TranslatedText id="cornerThreshold" defaultText="Corner Threshold" />
                <span className="ml-1 text-gray-500">({localSettings.cornerThreshold}°)</span>
              </label>
              <input
                type="range"
                name="cornerThreshold"
                min="0"
                max="180"
                value={localSettings.cornerThreshold}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TranslatedText id="segmentLength" defaultText="Segment Length" />
                <span className="ml-1 text-gray-500">({localSettings.segmentLength})</span>
              </label>
              <input
                type="range"
                name="segmentLength"
                min="1"
                max="10"
                value={localSettings.segmentLength}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TranslatedText id="spliceThreshold" defaultText="Splice Threshold" />
                <span className="ml-1 text-gray-500">({localSettings.spliceThreshold}°)</span>
              </label>
              <input
                type="range"
                name="spliceThreshold"
                min="0"
                max="180"
                value={localSettings.spliceThreshold}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                id="strokeWidthDetection"
                name="strokeWidthDetection"
                type="checkbox"
                checked={localSettings.strokeWidthDetection}
                onChange={handleChange}
                disabled={isProcessing}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="strokeWidthDetection" className="ml-2 block text-sm text-gray-700">
                <TranslatedText id="strokeWidthDetection" defaultText="Stroke Width Detection" />
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="backgroundTransparency"
                name="backgroundTransparency"
                type="checkbox"
                checked={localSettings.backgroundTransparency}
                onChange={handleChange}
                disabled={isProcessing}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="backgroundTransparency" className="ml-2 block text-sm text-gray-700">
                <TranslatedText id="backgroundTransparency" defaultText="Background Transparency" />
              </label>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
