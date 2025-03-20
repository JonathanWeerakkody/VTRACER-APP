import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText'; // Assumed translation component

export default function EnhancedSettingsPanel({ settings, onChange, isProcessing, onApplyToAll }) {
  const [localSettings, setLocalSettings] = useState({
    colorMode: 'colored',      // Default: Colored output
    clustering: 'stacked',     // Default: Stacked shapes
    colorPrecision: 6,         // Default values
    gradientStep: 16,
    filterSpeckle: 4,
    curveFitting: 'spline',    // Default: Smooth curves
    splineTension: 0.5,        // For Spline only
    cornerThreshold: 60,       // For Polygon only
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

  // Conditions for dynamic display
  const isColoredMode = localSettings.colorMode === 'colored';
  const isSplineMode = localSettings.curveFitting === 'spline';
  const isPolygonMode = localSettings.curveFitting === 'polygon';

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          <TranslatedText id="settings" defaultText="Settings" />
        </h2>
        {onApplyToAll && (
          <button
            onClick={handleApplyToAll}
            disabled={isProcessing}
            className={`px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <TranslatedText id="applyToAll" defaultText="Apply to All Images" />
          </button>
        )}
      </div>

      {/* Color Settings Section */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Settings</h3>

        {/* Color Mode */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="colorMode" defaultText="Color Style" />
            </label>
            <span className="ml-2 text-gray-400 cursor-help" title="Pick if your image should have colors or just black and white. 'Colored' keeps all the colors, while 'Black & White' simplifies it to outlines.">ⓘ</span>
          </div>
          <div className="flex space-x-4 mt-2">
            {['colored', 'bw'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode, 'colorMode')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.colorMode === mode ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} border`}
              >
                <TranslatedText id={`${mode}Mode`} defaultText={mode === 'colored' ? 'Colored' : 'Black & White'} />
              </button>
            ))}
          </div>
        </div>

        {/* Clustering (Colored Mode Only) */}
        {isColoredMode && (
          <div className="mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="clustering" defaultText="Shape Arrangement" />
              </label>
              <span className="ml-2 text-gray-400 cursor-help" title="Choose how colored shapes stack up. 'Stacked' layers them on top, keeping overlaps. 'Cutout' removes overlaps for a flatter look.">ⓘ</span>
            </div>
            <div className="flex space-x-4 mt-2">
              {['stacked', 'cutout'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeChange(mode, 'clustering')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.clustering === mode ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} border`}
                >
                  <TranslatedText id={`${mode}Clustering`} defaultText={mode === 'stacked' ? 'Stacked' : 'Cutout'} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Precision (Colored Mode Only) */}
        {isColoredMode && (
          <div className="mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="colorPrecision" defaultText="Color Variety" />
              </label>
              <span className="ml-2 text-gray-400 cursor-help" title="Set how many colors your image uses. A higher number keeps more colors, making it look richer but more complex.">ⓘ</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="range"
                name="colorPrecision"
                min="1"
                max="8"
                value={localSettings.colorPrecision}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>4</span>
              <span>8</span>
            </div>
          </div>
        )}

        {/* Gradient Step (Colored Mode Only) */}
        {isColoredMode && (
          <div className="mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="gradientStep" defaultText="Color Blend" />
              </label>
              <span className="ml-2 text-gray-400 cursor-help" title="Adjust how smoothly colors change in gradients. Smaller numbers make blends softer, bigger numbers make them sharper.">ⓘ</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="range"
                name="gradientStep"
                min="1"
                max="32"
                value={localSettings.gradientStep}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>16</span>
              <span>32</span>
            </div>
          </div>
        )}
      </section>

      {/* Path Settings Section */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Path Settings</h3>

        {/* Filter Speckle */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="filterSpeckle" defaultText="Noise Cleanup" />
            </label>
            <span className="ml-2 text-gray-400 cursor-help" title="Remove tiny spots or noise from the image. Higher numbers clean up more but might erase small details.">ⓘ</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="range"
              name="filterSpeckle"
              min="0"
              max="10"
              value={localSettings.filterSpeckle}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
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
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Curve Fitting */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="curveFitting" defaultText="Line Style" />
            </label>
            <span className="ml-2 text-gray-400 cursor-help" title="Choose how lines are drawn. 'Spline' makes smooth curves, 'Polygon' uses straight lines, 'Pixel' keeps it exact to the image.">ⓘ</span>
          </div>
          <div className="flex space-x-4 mt-2">
            {['spline', 'polygon', 'pixel'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode, 'curveFitting')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.curveFitting === mode ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} border`}
              >
                <TranslatedText id={`${mode}Mode`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
              </button>
            ))}
          </div>
        </div>

        {/* Spline Tension (Spline Mode Only) */}
        {isSplineMode && (
          <div className="mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="splineTension" defaultText="Curve Smoothness" />
              </label>
              <span className="ml-2 text-gray-400 cursor-help" title="Adjust how smooth the curves look. Lower numbers keep curves tight to the image, higher numbers make them flow more.">ⓘ</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="range"
                name="splineTension"
                min="0"
                max="1"
                step="0.1"
                value={localSettings.splineTension}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>0.5</span>
              <span>1</span>
            </div>
          </div>
        )}

        {/* Corner Threshold (Polygon Mode Only) */}
        {isPolygonMode && (
          <div className="mb-6">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="cornerThreshold" defaultText="Corner Sharpness" />
              </label>
              <span className="ml-2 text-gray-400 cursor-help" title="Decide how sharp a turn needs to be to form a corner. Lower numbers catch more corners, higher numbers simplify the shape.">ⓘ</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="range"
                name="cornerThreshold"
                min="0"
                max="180"
                value={localSettings.cornerThreshold}
                onChange={handleChange}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
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
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
