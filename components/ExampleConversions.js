import React from 'react';
import TranslatedText from './i18n/TranslatedText';

export default function ExampleConversions() {
  const examples = [
    {
      id: 'logo',
      title: 'logoConversion',
      description: 'logoConversionDesc',
      originalImage: '/examples/logo-original.png',
      svgImage: '/examples/logo-svg.svg',
    },
    {
      id: 'photo',
      title: 'photoConversion',
      description: 'photoConversionDesc',
      originalImage: '/examples/photo-original.jpg',
      svgImage: '/examples/photo-svg.svg',
    },
    {
      id: 'sketch',
      title: 'sketchConversion',
      description: 'sketchConversionDesc',
      originalImage: '/examples/sketch-original.png',
      svgImage: '/examples/sketch-svg.svg',
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            <TranslatedText id="examples" defaultText="Examples" />
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <TranslatedText id="examplesTitle" defaultText="See the transformation" />
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            <TranslatedText id="examplesDescription" defaultText="Check out these before and after examples of our SVG conversion." />
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {examples.map((example) => (
              <div key={example.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    <TranslatedText id={example.title} defaultText={example.title} />
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    <TranslatedText id={example.description} defaultText={example.description} />
                  </p>
                </div>
                
                <div className="relative">
                  {/* Original image (left half) */}
                  <div className="w-full h-48 sm:h-64 bg-gray-100">
                    <img 
                      src={example.originalImage} 
                      alt={`Original ${example.id}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* SVG image overlay (right half with gradient transition) */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2"></div>
                    <div className="w-1/2 bg-gradient-to-r from-transparent to-white">
                      <img 
                        src={example.svgImage} 
                        alt={`SVG ${example.id}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    <TranslatedText id="original" defaultText="Original" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-indigo-600 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    <TranslatedText id="svg" defaultText="SVG" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
