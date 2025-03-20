import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText'; // Assumed translation component

export default function EnhancedSettingsPanel({ settings, onChange, isProcessing, onApplyToAll }) {
  const [localSettings, setLocalSettings] = useState({
    colorMode: 'colored',      // Default to 'colored'
    clustering: 'stacked',     // Default clustering mode
    colorPrecision: 6,         // Default values
    gradientStep: 16,
    filterSpeckle: 4,
    curveFitting: 'spline',    // Default curve fitting mode
    splineTension: 0.5,        // Specific to spline
    cornerThreshold: 60,       // Specific to polygon
    ...settings,               // Override defaults with props
  });

  useEffect(() => {
    setLocalSettings((prev) => ({ ...prev, ...settings }));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    const newSettings = { ...localSettings, [name]: newValue };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  const handleModeChange = (mode, field) => {
    const newSettings = { ...localSettings, [field]: mode };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  const handleApplyToAll = () => {
    if (onApplyToAll) onApplyToAll(localSettings);
  };

  // Dynamic conditions
  const isColoredMode = localSettings.colorMode === 'colored';
  const isSplineMode = localSettings.curveFitting === 'spline';
  const isPolygonMode = localSettings.curveFitting === 'polygon';

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
            className={`px-3 py-1.5 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <TranslatedText id="applyToAll" defaultText="Apply to All Images" />
          </button>
        )}
      </div>

      {/* Color Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="colorMode" defaultText="Color Mode" />
        </label>
        <div className="flex space-x-4">
          {['colored', 'bw'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleModeChange(mode, 'colorMode')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.colorMode === mode ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
            >
              <TranslatedText id={`${mode}Mode`} defaultText={mode === 'colored' ? 'Colored' : 'Black & White'} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          <TranslatedText id="colorModeDesc" defaultText="Choose whether the output should be colored or black and white." />
        </p>
      </div>

      {/* Clustering (Only for Colored Mode) */}
      {isColoredMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="clustering" defaultText="Clustering" />
          </label>
          <div className="flex space-x-4">
            {['stacked', 'cutout'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode, 'clustering')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.clustering === mode ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              >
                <TranslatedText id={`${mode}Clustering`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <TranslatedText id="clusteringDesc" defaultText="Should shapes be stacked on top of another or be disjoint?" />
          </p>
        </div>
      )}

      {/* Color Precision (Only for Colored Mode) */}
      {isColoredMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="colorPrecision" defaultText="Color Precision" />
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="colorPrecision"
              min="1"
              max="8"
              value={localSettings.colorPrecision}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="colorPrecision"
              value={localSettings.colorPrecision}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min="1"
              max="8"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <TranslatedText id="colorPrecisionDesc" defaultText="Number of significant bits to use in an RGB channel." />
          </p>
        </div>
      )}

      {/* Gradient Step (Only for Colored Mode) */}
      {isColoredMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="gradientStep" defaultText="Gradient Step" />
          </label>
          <div className="flex items-center space-x-4">
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
            <input
              type="number"
              name="gradientStep"
              value={localSettings.gradientStep}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min="1"
              max="32"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <TranslatedText id="gradientStepDesc" defaultText="Color difference between gradient layers." />
          </p>
        </div>
      )}

      {/* Filter Speckle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="filterSpeckle" defaultText="Filter Speckle" />
        </label>
        <div className="flex items-center space-x-4">
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
          <input
            type="number"
            name="filterSpeckle"
            value={localSettings.filterSpeckle}
            onChange={handleChange}
            disabled={isProcessing}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            min="0"
            max="10"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          <TranslatedText id="filterSpeckleDesc" defaultText="Discard patches smaller than X px in size." />
        </p>
      </div>

      {/* Curve Fitting */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TranslatedText id="curveFitting" defaultText="Curve Fitting" />
        </label>
        <div className="flex space-x-4">
          {['spline', 'polygon', 'pixel'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleModeChange(mode, 'curveFitting')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.curveFitting === mode ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
            >
              <TranslatedText id={`${mode}Mode`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          <TranslatedText id="curveFittingDesc" defaultText="Choose the curve fitting mode." />
        </p>
      </div>

      {/* Spline Tension (Only for Spline Mode) */}
      {isSplineMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="splineTension" defaultText="Spline Tension" />
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="splineTension"
              min="0"
              max="1"
              step="0.1"
              value={localSettings.splineTension}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              name="splineTension"
              value={localSettings.splineTension}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <TranslatedText id="splineTensionDesc" defaultText="Adjust the tension of the spline curves." />
          </p>
        </div>
      )}

      {/* Corner Threshold (Only for Polygon Mode) */}
      {isPolygonMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <TranslatedText id="cornerThreshold" defaultText="Corner Threshold" />
          </label>
          <div className="flex items-center space-x-4">
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
            <input
              type="number"
              name="cornerThreshold"
              value={localSettings.cornerThreshold}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min="0"
              max="180"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            <TranslatedText id="cornerThresholdDesc" defaultText="Angle threshold for corner detection in degrees." />
          </p>
        </div>
      )}
    </div>
  );
}
