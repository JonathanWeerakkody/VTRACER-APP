import React, { useState } from 'react';

const SettingsPanel = ({ settings = {}, onChange }) => {
  // Initialize local state with default settings, overridden by props
  const [localSettings, setLocalSettings] = useState({
    clusteringMode: 'color',          // 'binary' or 'color'
    hierarchicalClustering: 'stacked', // 'stacked' or 'cutout'
    curveFitting: 'spline',           // 'none', 'polygon', 'spline'
    filterSpeckle: 4,
    colorPrecision: 6,
    layerDifference: 16,
    cornerThreshold: 60,
    lengthThreshold: 4,
    spliceThreshold: 45,
    ...settings,
  });

  // State to track if advanced settings are open
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Handle button selections (updates local state only)
  const handleModeChange = (field, value) => {
    setLocalSettings({ ...localSettings, [field]: value });
  };

  // Handle slider/number input changes (updates local state only)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = isNaN(value) ? value : Number(value);
    setLocalSettings({ ...localSettings, [name]: newValue });
  };

  // Apply settings when "Apply Settings" is clicked
  const applySettings = () => {
    onChange(localSettings);
  };

  // Toggle advanced settings
  const toggleAdvancedSettings = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  return (
    <div className="p-4">
      {/*
        REMOVED the top-level "Settings" heading and 
        MOVED the "Clustering Mode" & "Hierarchical Clustering" sections 
        INTO the advanced settings dropdown below.
      */}

      {/* Advanced Settings Box (now holds everything) */}
      <div className="border border-gray-300 rounded-lg shadow-sm mb-6">
        <button 
          onClick={toggleAdvancedSettings}
          className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-t-lg hover:bg-blue-50 focus:outline-none"
        >
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 002.37-1.066c.608-.996.07-2.296-1.065-2.572z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-bold text-blue-800">Advanced Settings</span>
          </div>
          <svg 
            className={`w-5 h-5 text-blue-700 transform transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        {isAdvancedOpen && (
          <div className="bg-blue-50 p-4 rounded-b-lg border-t border-gray-300">
            
            {/* ======== MOVED from top-level into Advanced ======== */}
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
                  Black &amp; White
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

            {/* Hierarchical Clustering */}
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
            {/* ======== END MOVED SECTION ======== */}

            {/* Filter Speckle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Speckle
                <span className="block text-xs text-gray-500">
                  Discard patches smaller than X px in size (1-16).
                </span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="filterSpeckle"
                  min="1"
                  max="16"
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
                  min="1"
                  max="16"
                />
              </div>
            </div>

            {/* Color Precision & Gradient Step (only if clusteringMode = 'color') */}
            {localSettings.clusteringMode === 'color' && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Precision
                    <span className="block text-xs text-gray-500">
                      Number of significant bits to use (1-8).
                    </span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name="colorPrecision"
                      min="1"
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
                      min="1"
                      max="8"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gradient Step
                    <span className="block text-xs text-gray-500">
                      Color difference between gradient layers (0-255).
                    </span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name="layerDifference"
                      min="0"
                      max="255"
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
                      max="255"
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
                  Pixel
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

            {/* Spline Options */}
            {localSettings.curveFitting === 'spline' && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Corner Threshold (°)
                    <span className="block text-xs text-gray-500">
                      Minimum angle to be considered a corner (0-180°).
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
                    Segment Length
                    <span className="block text-xs text-gray-500">
                      Minimum length of a path segment (1-10).
                    </span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name="lengthThreshold"
                      min="1"
                      max="10"
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
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Splice Threshold
                    <span className="block text-xs text-gray-500">
                      Maximum distance to splice paths (0-100).
                    </span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name="spliceThreshold"
                      min="0"
                      max="100"
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
                      max="100"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Moved the Apply Settings button here, full width */}
            <button
              type="button"
              onClick={applySettings}
              className="w-full px-4 py-2 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
