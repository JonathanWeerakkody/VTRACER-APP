import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

export default function SettingsPanel({ settings, onChange, isProcessing }) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);
  
  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Conversion Settings</h2>
      
      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Mode</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-primary"
              name="mode"
              value="shape"
              checked={localSettings.mode === 'shape'}
              onChange={() => handleChange('mode', 'shape')}
              disabled={isProcessing}
            />
            <span className="ml-2">Shape Mode</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-primary"
              name="mode"
              value="centerline"
              checked={localSettings.mode === 'centerline'}
              onChange={() => handleChange('mode', 'centerline')}
              disabled={isProcessing}
            />
            <span className="ml-2">Centerline Mode</span>
          </label>
        </div>
      </div>
      
      {/* Curve Accuracy Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="font-medium text-gray-700">Curve Accuracy</label>
          <span className="text-sm text-gray-500">{localSettings.curveAccuracy}</span>
        </div>
        <ReactSlider
          className="w-full h-6"
          thumbClassName="absolute w-6 h-6 bg-primary rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary/50 -top-2"
          trackClassName="h-2 bg-gray-200 rounded-full"
          min={0}
          max={10}
          value={localSettings.curveAccuracy}
          onChange={(value) => handleChange('curveAccuracy', value)}
          disabled={isProcessing}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Less Detail</span>
          <span>More Detail</span>
        </div>
      </div>
      
      {/* Color Quantization Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="font-medium text-gray-700">Color Quantization</label>
          <span className="text-sm text-gray-500">{localSettings.colorQuantization}</span>
        </div>
        <ReactSlider
          className="w-full h-6"
          thumbClassName="absolute w-6 h-6 bg-primary rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary/50 -top-2"
          trackClassName="h-2 bg-gray-200 rounded-full"
          min={0}
          max={10}
          value={localSettings.colorQuantization}
          onChange={(value) => handleChange('colorQuantization', value)}
          disabled={isProcessing}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Fewer Colors</span>
          <span>More Colors</span>
        </div>
      </div>
      
      {/* Path Simplification Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="font-medium text-gray-700">Path Simplification</label>
          <span className="text-sm text-gray-500">{localSettings.pathSimplification}</span>
        </div>
        <ReactSlider
          className="w-full h-6"
          thumbClassName="absolute w-6 h-6 bg-primary rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary/50 -top-2"
          trackClassName="h-2 bg-gray-200 rounded-full"
          min={0}
          max={10}
          value={localSettings.pathSimplification}
          onChange={(value) => handleChange('pathSimplification', value)}
          disabled={isProcessing}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Simpler Paths</span>
          <span>Complex Paths</span>
        </div>
      </div>
      
      {/* Toggle Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-700">Stroke Width Detection</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input
              type="checkbox"
              name="strokeWidthDetection"
              id="strokeWidthDetection"
              checked={localSettings.strokeWidthDetection}
              onChange={(e) => handleChange('strokeWidthDetection', e.target.checked)}
              disabled={isProcessing}
              className="sr-only"
            />
            <label
              htmlFor="strokeWidthDetection"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                localSettings.strokeWidthDetection ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                  localSettings.strokeWidthDetection ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </label>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-700">Background Transparency</label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input
              type="checkbox"
              name="backgroundTransparency"
              id="backgroundTransparency"
              checked={localSettings.backgroundTransparency}
              onChange={(e) => handleChange('backgroundTransparency', e.target.checked)}
              disabled={isProcessing}
              className="sr-only"
            />
            <label
              htmlFor="backgroundTransparency"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                localSettings.backgroundTransparency ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                  localSettings.backgroundTransparency ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </label>
          </div>
        </div>
      </div>
      
      {/* Reset Button */}
      <button
        onClick={() => onChange({
          mode: 'shape',
          curveAccuracy: 4,
          colorQuantization: 6,
          pathSimplification: 8,
          strokeWidthDetection: false,
          backgroundTransparency: false
        })}
        disabled={isProcessing}
        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Reset to Defaults
      </button>
    </div>
  );
}
