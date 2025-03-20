import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText'; // Assumed translation component

export default function VectorizationSettingsPanel({ settings, onChange, isProcessing, onApplySettings }) {
  // Default settings, merged with any provided via props
  const [localSettings, setLocalSettings] = useState({
    colorMode: 'colored',      // Colored or Black & White
    clustering: 'stacked',     // Stacked or Cutout (for Colored mode)
    filterSpeckle: 4,          // Noise removal level
    curveFitting: 'spline',    // Spline, Polygon, or Pixel
    cornerThreshold: 60,       // For Spline mode
    segmentLength: 4,          // For Spline mode
    spliceThreshold: 45,       // For Spline mode
    colorPrecision: 6,         // For Colored mode
    gradientStep: 16,          // For Colored mode
    splineTension: 0.5,        // For Spline mode
    ...settings,               // Override defaults with provided settings
  });

  // Sync local settings with props when they change
  useEffect(() => {
    setLocalSettings((prev) => ({ ...prev, ...settings }));
  }, [settings]);

  // Handle slider and number input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = isNaN(value) ? value : Number(value);
    const newSettings = { ...localSettings, [name]: newValue };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  // Handle button-based mode changes
  const handleModeChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  // Dynamic visibility conditions
  const isColoredMode = localSettings.colorMode === 'colored';
  const isSplineMode = localSettings.curveFitting === 'spline';

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        <TranslatedText id="settings" defaultText="Settings" />
      </h2>

      {/* Entire Settings in an Advanced Settings Dropdown */}
      <details className="mb-8">
        <summary className="text-lg font-medium text-gray-900 cursor-pointer mb-4">
          <TranslatedText id="advancedSettings" defaultText="Advanced Settings" />
        </summary>

        {/* Color Mode */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="colorMode" defaultText="Color Style" />
            </label>
            <span className="text-gray-400 cursor-help" title="Pick if the image keeps its colors or turns into simple black and white lines.">ⓘ</span>
          </div>
          <div className="flex space-x-4 mt-2">
            {['colored', 'bw'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange('colorMode', mode)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.colorMode === mode ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} border border-gray-300`}
              >
                <TranslatedText id={`${mode}Mode`} defaultText={mode === 'colored' ? 'Colored' : 'Black & White'} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">Decide if your picture stays colorful or becomes a basic outline.</p>
        </div>

        {/* Clustering (Shows only in Colored mode) */}
        {isColoredMode && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                <TranslatedText id="clustering" defaultText="Shape Arrangement" />
              </label>
              <span className="text-gray-400 cursor-help" title="Set whether colored shapes stack on top of each other or stay apart.">ⓘ</span>
            </div>
            <div className="flex space-x-4 mt-2">
              {['stacked', 'cutout'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeChange('clustering', mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.clustering === mode ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} border border-gray-300`}
                >
                  <TranslatedText id={`${mode}Clustering`} defaultText={mode === 'stacked' ? 'Stacked' : 'Cutout'} />
                </button>
              ))}
            </div>
            <p className="mt-2 text-smactions text-gray-600">Choose if colored parts overlap or stand alone.</p>
          </div>
        )}

        {/* Filter Speckle */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="filterSpeckle" defaultText="Noise Cleanup" />
            </label>
            <span className="text-gray-400 cursor-help" title="Clear out tiny dots or messiness in the image.">ⓘ</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="range"
              name="filterSpeckle"
              min="0"
              max="10"
              value={localSettings.filterSpeckle}
              onChange={handleChange}
              className="w-full"
            />
            <input
              type="number"
              name="filterSpeckle"
              value={localSettings.filterSpeckle}
              onChange={handleChange}
              className="w-16 px-2 py-1 border rounded"
              min="0"
              max="10"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Get rid of small blemishes to tidy up your image.</p>
        </div>

        {/* Curve Fitting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              <TranslatedText id="curveFitting" defaultText="Line Style" />
            </label>
            <span className="text-gray-400 cursor-help" title="Choose how lines are made: curvy, straight, or matching every pixel.">ⓘ</span>
          </div>
          <div className="flex space-x-4 mt-2">
            {['spline', 'polygon', 'pixel'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange('curveFitting', mode)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${localSettings.curveFitting === mode ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} border border-gray-300`}
              >
                <TranslatedText id={`${mode}Mode`} defaultText={mode.charAt(0).toUpperCase() + mode.slice(1)} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">Pick how the lines form: wavy, rigid, or precise.</p>
        </div>

        {/* Spline-Specific Settings (Shows only in Spline mode) */}
        {isSplineMode && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="cornerThreshold" defaultText="Corner Detection" />
                </label>
                <span className="text-gray-400 cursor-help" title="Decide the angle that makes a corner stand out.">ⓘ</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  name="cornerThreshold"
                  min="0"
                  max="180"
                  value={localSettings.cornerThreshold}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="cornerThreshold"
                  value={localSettings.cornerThreshold}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
                  min="0"
                  max="180"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Set how sharp an angle needs to be to count as a corner.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="segmentLength" defaultText="Line Segments" />
                </label>
                <span className="text-gray-400 cursor-help" title="Adjust how long each piece of the line is.">ⓘ</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  name="segmentLength"
                  min="1"
                  max="10"
                  value={localSettings.segmentLength}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="segmentLength"
                  value={localSettings.segmentLength}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
                  min="1"
                  max="10"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Change the size of each line chunk in the drawing.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="spliceThreshold" defaultText="Splice Angle" />
                </label>
                <span className="text-gray-400 cursor-help" title="Set the angle where lines join together.">ⓘ</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  name="spliceThreshold"
                  min="0"
                  max="180"
                  value={localSettings.spliceThreshold}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="spliceThreshold"
                  value={localSettings.spliceThreshold}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
                  min="0"
                  max="180"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Adjust the angle that connects line pieces.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="splineTension" defaultText="Curve Tightness" />
                </label>
                <span className="text-gray-400 cursor-help" title="Adjust how snug the curves stick to the original shape.">ⓘ</span>
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
                  className="w-full"
                />
                <input
                  type="number"
                  name="splineTension"
                  value={localSettings.splineTension}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
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
              <p className="mt-2 text-sm text-gray-600">Modify how tightly curves match the image.</p>
            </div>
          </>
        )}

        {/* Colored Mode Advanced Settings */}
        {isColoredMode && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="colorPrecision" defaultText="Color Detail" />
                </label>
                <span className="text-gray-400 cursor-help" title="Tweak how many colors show up in the result.">ⓘ</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  name="colorPrecision"
                  min="1"
                  max="8"
                  value={localSettings.colorPrecision}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="colorPrecision"
                  value={localSettings.colorPrecision}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
                  min="1"
                  max="8"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>4</span>
                <span>8</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Fine-tune the amount of colors in your vector image.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  <TranslatedText id="gradientStep" defaultText="Color Transition" />
                </label>
                <span className="text-gray-400 cursor-help" title="Change how gentle color shifts look.">ⓘ</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  name="gradientStep"
                  min="1"
                  max="32"
                  value={localSettings.gradientStep}
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="number"
                  name="gradientStep"
                  value={localSettings.gradientStep}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 border rounded"
                  min="1"
                  max="32"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>16</span>
                <span>32</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Alter the smoothness of color changes.</p>
            </div>
          </>
        )}
      </details>

      {/* Apply Button Outside the Dropdown */}
      <button
        onClick={() => onApplySettings(localSettings)}
        disabled={isProcessing}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        <TranslatedText id="applySettings" defaultText="Apply Settings to Preview" />
      </button>
    </div>
  );
}
