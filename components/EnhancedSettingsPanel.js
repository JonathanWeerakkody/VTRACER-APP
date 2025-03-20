import { useState, useEffect } from 'react';
import { BinaryImageConverter, ColorImageConverter } from 'vtracer';
import TranslatedText from './i18n/TranslatedText';

export default function VectorizationSettingsPanel({ settings, isProcessing, onApplySettings }) {
  const [localSettings, setLocalSettings] = useState({
    colorMode: 'colored',
    clustering: 'stacked',
    filterSpeckle: 4,
    curveFitting: 'spline',
    cornerThreshold: 60,
    segmentLength: 4,
    spliceThreshold: 45,
    colorPrecision: 6,
    gradientStep: 16,
    splineTension: 0.5,
    ...settings,
  });

  const isColoredMode = localSettings.colorMode === 'colored';
  const isSplineMode = localSettings.curveFitting === 'spline';

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSettings = { ...localSettings, [name]: isNaN(value) ? value : Number(value) };
    setLocalSettings(newSettings);
    triggerPreview(newSettings);
  };

  const handleModeChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);
    triggerPreview(newSettings);
  };

  const triggerPreview = (settings) => {
    const converter_params = {
      mode: settings.curveFitting,
      clustering_mode: settings.colorMode === 'colored' ? 'color' : 'binary',
      hierarchical: settings.clustering,
      corner_threshold: deg2rad(settings.cornerThreshold),
      length_threshold: settings.segmentLength,
      max_iterations: 10,
      splice_threshold: deg2rad(settings.spliceThreshold),
      filter_speckle: settings.filterSpeckle ** 2,
      color_precision: 8 - settings.colorPrecision,
      layer_difference: settings.gradientStep,
      path_precision: 8,
      spline_tension: settings.splineTension,
    };

    const runner = new ConverterRunner(JSON.stringify(converter_params));
    runner.run();
  };

  const deg2rad = (deg) => deg / 180 * Math.PI;

  class ConverterRunner {
    constructor(converter_params) {
      const params = JSON.parse(converter_params);
      this.converter =
        params.clustering_mode === 'color'
          ? ColorImageConverter.new_with_string(converter_params)
          : BinaryImageConverter.new_with_string(converter_params);
      this.converter.init();
      this.stopped = false;
    }

    run() {
      const This = this;
      function tick() {
        if (!This.stopped) {
          let done = false;
          const startTick = performance.now();
          while (!(done = This.converter.tick()) && performance.now() - startTick < 25) {}
          if (!done) setTimeout(tick, 1);
        }
      }
      setTimeout(tick, 1);
    }

    stop() {
      this.stopped = true;
      this.converter.free();
    }
  }

  useEffect(() => {
    triggerPreview(localSettings);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <details className="mb-8" open>
        <summary className="text-lg font-medium text-gray-900 cursor-pointer mb-4">
          <TranslatedText id="advancedSettings" defaultText="Advanced Settings" />
        </summary>

        {/* Color Mode */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Color Mode</label>
          <div className="flex space-x-4 mt-2">
            {['colored', 'bw'].map((mode) => (
              <button key={mode} onClick={() => handleModeChange('colorMode', mode)}>
                {mode === 'colored' ? 'Colored' : 'Black & White'}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Clustering Mode */}
        {isColoredMode && (
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Shape Arrangement</label>
            <div className="flex space-x-4 mt-2">
              {['stacked', 'cutout'].map((mode) => (
                <button key={mode} onClick={() => handleModeChange('clustering', mode)}>
                  {mode}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Speckle */}
        <input type="range" name="filterSpeckle" min="0" max="10" value={localSettings.filterSpeckle} onChange={handleChange} />

        {/* Curve Fitting Mode */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Curve Fitting</label>
          <div className="flex space-x-4 mt-2">
            {['spline', 'polygon', 'pixel'].map((mode) => (
              <button key={mode} onClick={() => handleModeChange('curveFitting', mode)}>
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Spline Mode Settings */}
        {isSplineMode && (
          <>
            <input type="range" name="cornerThreshold" min="0" max="180" value={localSettings.cornerThreshold} onChange={handleChange} />
            <input type="range" name="segmentLength" min="1" max="10" value={localSettings.segmentLength} onChange={handleChange} />
            <input type="range" name="spliceThreshold" min="0" max="180" value={localSettings.spliceThreshold} onChange={handleChange} />
            <input type="range" name="splineTension" min="0" max="1" step="0.1" value={localSettings.splineTension} onChange={handleChange} />
          </>
        )}

        {/* Colored Mode Specific Settings */}
        {isColoredMode && (
          <>
            <input type="range" name="colorPrecision" min="1" max="8" value={localSettings.colorPrecision} onChange={handleChange} />
            <input type="range" name="gradientStep" min="1" max="32" value={localSettings.gradientStep} onChange={handleChange} />
          </>
        )}
      </details>

      <button
        onClick={() => onApplySettings(localSettings)}
        disabled={isProcessing}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Apply Settings to Preview
      </button>
    </div>
  );
}
