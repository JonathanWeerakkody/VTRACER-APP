// components/EnhancedSettingsPanel.js

import { useState, useEffect } from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function EnhancedSettingsPanel({ settings, onChange, isProcessing }) {
  // Merge default settings with anything passed in:
  const [localSettings, setLocalSettings] = useState({
    // Clustering options
    colorMode: 'color',     // 'bw' or 'color'
    bwThreshold: 128,       // only used if colorMode = 'bw'
    layerMode: 'stacked',   // 'stacked' or 'cutout'

    // Filter options
    filterSpeckle: 4,       // 1-20
    colorPrecision: 6,      // 1-10
    gradientStep: 16,       // 1-32

    // Curve fitting options
    curveFitting: 'spline', // 'pixel', 'polygon', or 'spline'
    cornerThreshold: 60,    // 1-100
    segmentLength: 4,       // 1-10
    spliceThreshold: 45,    // 1-100

    // Additional options
    strokeWidthDetection: true,
    backgroundTransparency: false,

    ...(settings || {})
  });

  // When parent `settings` changes, update our local state
  useEffect(() => {
    if (settings) {
      setLocalSettings((prev) => ({ ...prev, ...settings }));
    }
  }, [settings]);

  // Unified change handler for sliders / numeric inputs / toggles / radios
  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  // Helper to prevent invalid numeric inputs
  const handleNumberInput = (key, min, max, rawValue) => {
    // Convert to integer (or 0 if invalid)
    let value = parseInt(rawValue, 10);
    if (isNaN(value)) value = min;
    // Clamp between min and max
    if (value < min) value = min;
    if (value > max) value = max;
    handleChange(key, value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-medium mb-4">
        <TranslatedText id="settings" defaultText="Settings" />
      </h2>

      <div className="space-y-6">
        {/* ======================
            CLUSTERING SECTION
           ====================== */}
        <div className="border-b pb-4">
          <h3 className="text-md font-medium mb-3 text-indigo-600">
            <TranslatedText id="clustering" defaultText="Clustering" />
          </h3>

          {/* Color Mode */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="colorMode" defaultText="Color Mode" />
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="colorMode"
                  value="bw"
                  checked={localSettings.colorMode === 'bw'}
                  onChange={() => handleChange('colorMode', 'bw')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="bw" defaultText="B/W" />
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="colorMode"
                  value="color"
                  checked={localSettings.colorMode === 'color'}
                  onChange={() => handleChange('colorMode', 'color')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="color" defaultText="Color" />
                </span>
              </label>
            </div>
          </div>

          {/* B/W Threshold (only if colorMode == 'bw') */}
          {localSettings.colorMode === 'bw' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <TranslatedText id="bwThreshold" defaultText="B/W Threshold" />
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={localSettings.bwThreshold}
                  onChange={(e) =>
                    handleChange('bwThreshold', parseInt(e.target.value))
                  }
                  disabled={isProcessing}
                  className="w-full"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={localSettings.bwThreshold}
                  onChange={(e) =>
                    handleNumberInput('bwThreshold', 0, 255, e.target.value)
                  }
                  disabled={isProcessing}
                  className="w-16 border px-1 py-0.5 rounded"
                />
              </div>
            </div>
          )}

          {/* Layer Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="layerMode" defaultText="Layer Mode" />
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="layerMode"
                  value="cutout"
                  checked={localSettings.layerMode === 'cutout'}
                  onChange={() => handleChange('layerMode', 'cutout')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="cutout" defaultText="Cutout" />
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="layerMode"
                  value="stacked"
                  checked={localSettings.layerMode === 'stacked'}
                  onChange={() => handleChange('layerMode', 'stacked')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="stacked" defaultText="Stacked" />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ======================
            FILTER OPTIONS
           ====================== */}
        <div className="border-b pb-4">
          <h3 className="text-md font-medium mb-3 text-indigo-600">
            <TranslatedText id="filterOptions" defaultText="Filter Options" />
          </h3>

          {/* Filter Speckle */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="filterSpeckle" defaultText="Filter Speckle" /> (
              <TranslatedText id="cleaner" defaultText="Cleaner" />
              ):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="20"
                value={localSettings.filterSpeckle}
                onChange={(e) => handleChange('filterSpeckle', parseInt(e.target.value))}
                disabled={isProcessing}
                className="w-full"
              />
              <input
                type="number"
                min="1"
                max="20"
                value={localSettings.filterSpeckle}
                onChange={(e) =>
                  handleNumberInput('filterSpeckle', 1, 20, e.target.value)
                }
                disabled={isProcessing}
                className="w-16 border px-1 py-0.5 rounded"
              />
            </div>
          </div>

          {/* colorPrecision & gradientStep only if colorMode = 'color' */}
          {localSettings.colorMode === 'color' && (
            <>
              {/* Color Precision */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <TranslatedText id="colorPrecision" defaultText="Color Precision" /> (
                  <TranslatedText id="moreAccurate" defaultText="More accurate" />
                  ):
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={localSettings.colorPrecision}
                    onChange={(e) =>
                      handleChange('colorPrecision', parseInt(e.target.value))
                    }
                    disabled={isProcessing}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={localSettings.colorPrecision}
                    onChange={(e) =>
                      handleNumberInput('colorPrecision', 1, 10, e.target.value)
                    }
                    disabled={isProcessing}
                    className="w-16 border px-1 py-0.5 rounded"
                  />
                </div>
              </div>

              {/* Gradient Step */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <TranslatedText id="gradientStep" defaultText="Gradient Step" /> (
                  <TranslatedText id="lessLayers" defaultText="Less layers" />
                  ):
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="32"
                    value={localSettings.gradientStep}
                    onChange={(e) =>
                      handleChange('gradientStep', parseInt(e.target.value))
                    }
                    disabled={isProcessing}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={localSettings.gradientStep}
                    onChange={(e) =>
                      handleNumberInput('gradientStep', 1, 32, e.target.value)
                    }
                    disabled={isProcessing}
                    className="w-16 border px-1 py-0.5 rounded"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ======================
            CURVE FITTING
           ====================== */}
        <div className="border-b pb-4">
          <h3 className="text-md font-medium mb-3 text-indigo-600">
            <TranslatedText id="curveFitting" defaultText="Curve Fitting" />
          </h3>

          {/* Curve Fitting Mode */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="curveFittingMode" defaultText="Curve Fitting Mode" />
            </label>
            <div className="flex space-x-4">
              {/* pixel */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="curveFitting"
                  value="pixel"
                  checked={localSettings.curveFitting === 'pixel'}
                  onChange={() => handleChange('curveFitting', 'pixel')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="pixel" defaultText="Pixel" />
                </span>
              </label>

              {/* polygon */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="curveFitting"
                  value="polygon"
                  checked={localSettings.curveFitting === 'polygon'}
                  onChange={() => handleChange('curveFitting', 'polygon')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="polygon" defaultText="Polygon" />
                </span>
              </label>

              {/* spline */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="curveFitting"
                  value="spline"
                  checked={localSettings.curveFitting === 'spline'}
                  onChange={() => handleChange('curveFitting', 'spline')}
                  disabled={isProcessing}
                />
                <span className="ml-2">
                  <TranslatedText id="spline" defaultText="Spline" />
                </span>
              </label>
            </div>
          </div>

          {/* Corner Threshold */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="cornerThreshold" defaultText="Corner Threshold" /> (
              <TranslatedText id="smoother" defaultText="Smoother" />
              ):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="100"
                value={localSettings.cornerThreshold}
                onChange={(e) =>
                  handleChange('cornerThreshold', parseInt(e.target.value))
                }
                disabled={isProcessing}
                className="w-full"
              />
              <input
                type="number"
                min="1"
                max="100"
                value={localSettings.cornerThreshold}
                onChange={(e) =>
                  handleNumberInput('cornerThreshold', 1, 100, e.target.value)
                }
                disabled={isProcessing}
                className="w-16 border px-1 py-0.5 rounded"
              />
            </div>
          </div>

          {/* Segment Length */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="segmentLength" defaultText="Segment Length" /> (
              <TranslatedText id="moreCoarse" defaultText="More coarse" />
              ):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="10"
                value={localSettings.segmentLength}
                onChange={(e) =>
                  handleChange('segmentLength', parseInt(e.target.value))
                }
                disabled={isProcessing}
                className="w-full"
              />
              <input
                type="number"
                min="1"
                max="10"
                value={localSettings.segmentLength}
                onChange={(e) =>
                  handleNumberInput('segmentLength', 1, 10, e.target.value)
                }
                disabled={isProcessing}
                className="w-16 border px-1 py-0.5 rounded"
              />
            </div>
          </div>

          {/* Splice Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <TranslatedText id="spliceThreshold" defaultText="Splice Threshold" /> (
              <TranslatedText id="lessAccurate" defaultText="Less accurate" />
              ):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="100"
                value={localSettings.spliceThreshold}
                onChange={(e) =>
                  handleChange('spliceThreshold', parseInt(e.target.value))
                }
                disabled={isProcessing}
                className="w-full"
              />
              <input
                type="number"
                min="1"
                max="100"
                value={localSettings.spliceThreshold}
                onChange={(e) =>
                  handleNumberInput('spliceThreshold', 1, 100, e.target.value)
                }
                disabled={isProcessing}
                className="w-16 border px-1 py-0.5 rounded"
              />
            </div>
          </div>
        </div>

        {/* ======================
            ADDITIONAL OPTIONS
           ====================== */}
        <div>
          <h3 className="text-md font-medium mb-3 text-indigo-600">
            <TranslatedText
              id="additionalOptions"
              defaultText="Additional Options"
            />
          </h3>

          <div className="space-y-2">
            {/* Stroke Width Detection */}
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={localSettings.strokeWidthDetection}
                onChange={(e) =>
                  handleChange('strokeWidthDetection', e.target.checked)
                }
                disabled={isProcessing}
              />
              <span className="ml-2">
                <TranslatedText
                  id="strokeWidthDetection"
                  defaultText="Stroke Width Detection"
                />
              </span>
            </label>

            {/* Background Transparency */}
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={localSettings.backgroundTransparency}
                onChange={(e) =>
                  handleChange('backgroundTransparency', e.target.checked)
                }
                disabled={isProcessing}
              />
              <span className="ml-2">
                <TranslatedText
                  id="backgroundTransparency"
                  defaultText="Background Transparency"
                />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
