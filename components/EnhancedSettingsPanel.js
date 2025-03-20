import React, { useState } from 'react';

const SettingsPanel = ({ settings = {}, onChange }) => {
  // Initialize state with default values, overridden by props
  const [localSettings, setLocalSettings] = useState({
    clusteringMode: 'color',          // 'binary' or 'color'
    hierarchicalClustering: 'stacked', // 'stacked' or 'cutout'
    curveFitting: 'spline',           // 'none', 'polygon', 'spline'
    filterSpeckle: 4,
    pathPrecision: 8,
    colorPrecision: 6,
    layerDifference: 16,
    cornerThreshold: 60,
    lengthThreshold: 4,
    spliceThreshold: 45,
    ...settings,
  });

  // Handle button selections (e.g., clusteringMode, curveFitting)
  const handleModeChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);
    onChange(newSettings); // Notify parent of changes
  };

  // Handle slider/number input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = isNaN(value) ? value : Number(value);
    const newSettings = { ...localSettings, [name]: newValue };
    setLocalSettings(newSettings);
    onChange(newSettings); // Notify parent of changes
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      {/* Clustering Mode */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clustering Mode
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => handleModeChange('clusteringMode', 'binary')}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              localSettings.clusteringMode === 'binary'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Binary
          </button>
          <button
            onClick={() => handleModeChange('clusteringMode', 'color')}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              localSettings.clusteringMode === 'color'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Color
          </button>
        </div>
      </div>

      {/* Color Clustering Options (shown when clusteringMode is 'color') */}
      {localSettings.clusteringMode === 'color' && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hierarchical Clustering
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleModeChange('hierarchicalClustering', 'stacked')}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  localSettings.hierarchicalClustering === 'stacked'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Stacked
              </button>
              <button
                onClick={() => handleModeChange('hierarchicalClustering', 'cutout')}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  localSettings.hierarchicalClustering === 'cutout'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Cutout
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Precision
              <span className="block text-xs text-gray-500">
                Controls the precision of color quantization (0-8).
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="colorPrecision"
                min="0"
                max="8"
                value={localSettings.colorPrecision}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="colorPrecision"
                value={localSettings.colorPrecision}
                onChange={handleChange}
                className="w-16 px-2 py-1 border rounded text-gray-700"
                min="0"
                max="8"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Layer Difference
              <span className="block text-xs text-gray-500">
                Sets the difference between color layers (0-64).
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="layerDifference"
                min="0"
                max="64"
                value={localSettings.layerDifference}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="layerDifference"
                value={localSettings.layerDifference}
                onChange={handleChange}
                className="w-16 px-2 py-1 border rounded text-gray-700"
                min="0"
                max="64"
              />
            </div>
          </div>
        </>
      )}

      {/* Curve Fitting */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Curve Fitting
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => handleModeChange('curveFitting', 'none')}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              localSettings.curveFitting === 'none'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            None
          </button>
          <button
            onClick={() => handleModeChange('curveFitting', 'polygon')}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              localSettings.curveFitting === 'polygon'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Polygon
          </button>
          <button
            onClick={() => handleModeChange('curveFitting', 'spline')}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              localSettings.curveFitting === 'spline'
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Spline
          </button>
        </div>
      </div>

      {/* Spline Options (shown when curveFitting is 'spline') */}
      {localSettings.curveFitting === 'spline' && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corner Threshold (°)
              <span className="block text-xs text-gray-500">
                Angle threshold for corner detection (0-180°).
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="cornerThreshold"
                min="0"
                max="180"
                value={localSettings.cornerThreshold}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="cornerThreshold"
                value={localSettings.cornerThreshold}
                onChange={handleChange}
                className="w-16 px-2 py-1 border rounded text-gray-700"
                min="0"
                max="180"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length Threshold
              <span className="block text-xs text-gray-500">
                Minimum segment length for splines (0-10).
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="lengthThreshold"
                min="0"
                max="10"
                step="0.1"
                value={localSettings.lengthThreshold}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="lengthThreshold"
                value={localSettings.lengthThreshold}
                onChange={handleChange}
                className="w-16 px-2 py-1 border rounded text-gray-700"
                min="0"
                max="10"
                step="0.1"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Splice Threshold (°)
              <span className="block text-xs text-gray-500">
                Angle threshold for splicing curves (0-180°).
              </span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="spliceThreshold"
                min="0"
                max="180"
                value={localSettings.spliceThreshold}
                onChange={handleChange}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                name="spliceThreshold"
                value={localSettings.spliceThreshold}
                onChange={handleChange}
                className="w-16 px-2 py-1 border rounded text-gray-700"
                min="0"
                max="180"
              />
            </div>
          </div>
        </>
      )}

      {/* Always Visible Settings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter Speckle
          <span className="block text-xs text-gray-500">
            Removes small noise artifacts (0-10).
          </span>
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            name="filterSpeckle"
            min="0"
            max="10"
            value={localSettings.filterSpeckle}
            onChange={handleChange}
            className="w-full accent-blue-500"
          />
          <input
            type="number"
            name="filterSpeckle"
            value={localSettings.filterSpeckle}
            onChange={handleChange}
            className="w-16 px-2 py-1 border rounded text-gray-700"
            min="0"
            max="10"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Path Precision
          <span className="block text-xs text-gray-500">
            Precision of path simplification (0-10).
          </span>
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            name="pathPrecision"
            min="0"
            max="10"
            value={localSettings.pathPrecision}
            onChange={handleChange}
            className="w-full accent-blue-500"
          />
          <input
            type="number"
            name="pathPrecision"
            value={localSettings.pathPrecision}
            onChange={handleChange}
            className="w-16 px-2 py-1 border rounded text-gray-700"
            min="0"
            max="10"
          />
        </div>
      </div>

      {/* Apply Settings Button */}
      <button
        onClick={() => onChange(localSettings)}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Apply Settings
      </button>
    </div>
  );
};

export default SettingsPanel;
