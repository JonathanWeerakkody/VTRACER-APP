// components/Settings.js
import { useState, useEffect } from 'react';

export default function Settings({ settings, onChange, isProcessing }) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);
  
  // Handle setting change
  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-medium mb-4">Settings</h2>
      
      <div className="space-y-4">
        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="mode"
                value="shape"
                checked={localSettings.mode === 'shape'}
                onChange={() => handleChange('mode', 'shape')}
                disabled={isProcessing}
              />
              <span className="ml-2">Shape</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="mode"
                value="centerline"
                checked={localSettings.mode === 'centerline'}
                onChange={() => handleChange('mode', 'centerline')}
                disabled={isProcessing}
              />
              <span className="ml-2">Centerline</span>
            </label>
          </div>
        </div>
        
        {/* Tolerance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tolerance: {localSettings.tolerance}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={localSettings.tolerance}
            onChange={(e) => handleChange('tolerance', parseInt(e.target.value))}
            disabled={isProcessing}
            className="w-full"
          />
        </div>
        
        {/* Color Quantization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Quantization: {localSettings.colorQuantization}
          </label>
          <input
            type="range"
            min="1"
            max="16"
            value={localSettings.colorQuantization}
            onChange={(e) => handleChange('colorQuantization', parseInt(e.target.value))}
            disabled={isProcessing}
            className="w-full"
          />
        </div>
        
        {/* Layer Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Layer Mode</label>
          <div className="flex space-x-4">
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
              <span className="ml-2">Stacked</span>
            </label>
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
              <span className="ml-2">Cutout</span>
            </label>
          </div>
        </div>
        
        {/* Path Simplification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Path Simplification: {localSettings.pathSimplification}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={localSettings.pathSimplification}
            onChange={(e) => handleChange('pathSimplification', parseInt(e.target.value))}
            disabled={isProcessing}
            className="w-full"
          />
        </div>
        
        {/* Curve Accuracy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curve Accuracy: {localSettings.curveAccuracy}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={localSettings.curveAccuracy}
            onChange={(e) => handleChange('curveAccuracy', parseInt(e.target.value))}
            disabled={isProcessing}
            className="w-full"
          />
        </div>
        
        {/* Toggle Options */}
        <div className="space-y-2">
          {/* Stroke Width Detection */}
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={localSettings.strokeWidthDetection}
              onChange={(e) => handleChange('strokeWidthDetection', e.target.checked)}
              disabled={isProcessing}
            />
            <span className="ml-2">Stroke Width Detection</span>
          </label>
          
          {/* Background Transparency */}
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={localSettings.backgroundTransparency}
              onChange={(e) => handleChange('backgroundTransparency', e.target.checked)}
              disabled={isProcessing}
            />
            <span className="ml-2">Background Transparency</span>
          </label>
        </div>
      </div>
    </div>
  );
}
