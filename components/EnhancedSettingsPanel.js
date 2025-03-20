import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function EnhancedSettingsPanel({ settings, onChange, isProcessing, onApplyToAll }) {
  const [localSettings, setLocalSettings] = useState({
    colorMode: 'color', // Default to 'color'
    layerMode: 'stacked',
    threshold: 128,
    colorQuantization: 8, // Default for grayscale/color
    gradientStep: 16,
    filterSpeckle: 4,
    pathSimplification: 2,
    curveFitting: 'spline',
    cornerThreshold: 90,
    segmentLength: 4,
    spliceThreshold: 45,
    strokeWidthDetection: false,
    backgroundTransparency: false,
    colorPrecision: 6, // Added for VTracer compatibility
    ...settings, // Override with props
  });

  useEffect(() => {
    setLocalSettings((prev) => ({ ...prev, ...settings }));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;
    const newSettings = { ...localSettings, [name]: newValue };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  const handleModeChange = (mode) => {
    const newSettings = { ...localSettings, colorMode: mode };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  const handleApplyToAll = () => {
    if (onApplyToAll) onApplyToAll(localSettings); // Pass current settings
  };

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
          {['bw', 'grayscale', 'color'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleModeChange(mode)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                localSettings.colorMode === mode
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <TranslatedText id={`${mode}Mode`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
            </button>
          ))}
        </div>
      </div>

      {/* Layer Mode */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="layerMode" defaultText="Layer Mode" />
        </label>
        <div className="flex space-x-4">
          {['stacked', 'cutout'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleChange({ target: { name: 'layerMode', value: mode } })}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                localSettings.layerMode === mode
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <TranslatedText id={`${mode}Mode`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
            </button>
          ))}
        </div>
      </div>

      {/* Mode-Specific Settings */}
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

      {(showGrayscaleSettings || showColorSettings) && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText
                id={showGrayscaleSettings ? 'grayLevels' : 'colorQuantization'}
                defaultText={showGrayscaleSettings ? 'Number of Gray Levels' : 'Number of Colors'}
              />
              <span className="ml-1 text-gray-500">({localSettings.colorQuantization})</span>
            </label>
            <input
              type="range"
              name="colorQuantization"
              min="2"
              max={showGrayscaleSettings ? '16' : '64'}
              value={localSettings.colorQuantization}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2</span>
              <span>{showGrayscaleSettings ? '8' : '32'}</span>
              <span>{showGrayscaleSettings ? '16' : '64'}</span>
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
              max="8" // Matches VTracer's typical range
              value={localSettings.colorPrecision}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>4</span>
              <span>8</span>
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

      {/* Common Settings */}
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

      {/* Advanced Settings */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer">
            <h3 className="text-sm font-medium text-gray-700">
              <TranslatedText id="advancedSettings" defaultText="Advanced Settings" />
            </h3>
            <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                {['pixel', 'polygon', 'spline'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'curveFitting', value: option } })}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      localSettings.curveFitting === option
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <TranslatedText id={`${option}Mode`} defaultText={option.charAt(0).toUpperCase() + option.slice(1)} />
                  </button>
                ))}
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
