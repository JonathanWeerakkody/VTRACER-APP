// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdBlockerNotification from '../components/AdBlockerNotification';

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>VTracer - Free Online Image to SVG Converter</title>
        <meta name="description" content="Convert your images to scalable vector graphics (SVG) instantly with our free online tool. Real-time preview and customization options." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900 cursor-pointer">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">VTracer</span>
              </span>
            </Link>
            <nav className="flex space-x-4">
              <Link href="/" className="text-indigo-600 font-medium">Home</Link>
              <Link href="/editor" className="text-gray-500 hover:text-gray-900">Editor</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
              
              <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Transform Images into</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Scalable Vector Graphics</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Convert your images to SVG instantly with our free online tool. Get high-quality vector graphics with real-time customization options.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <button
                        onClick={() => router.push('/editor')}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Start Converting
                      </button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a href="#examples" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                        View Examples
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="/hero-image.jpg" alt="Image to SVG conversion example" />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for perfect SVGs
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our powerful conversion tool gives you complete control over your vector graphics.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Instant Conversion</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Upload your image and get an SVG preview instantly. No waiting, no processing delays.
                    </p>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Real-Time Customization</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Adjust settings and see changes in real-time. Fine-tune your SVG to perfection.
                    </p>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">High-Quality Results</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Get clean, optimized SVGs that scale perfectly for any use case.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Examples Section */}
        <div id="examples" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Examples</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                See the transformation
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Check out these before and after examples of our SVG conversion.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example 1 */}
              <div className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <div className="grid grid-cols-2 h-full">
                    <div className="border-r border-gray-200 p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">Original</p>
                      <img src="/example1-original.jpg" alt="Example 1 Original" className="w-full h-full object-contain" />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">SVG</p>
                      <img src="/example1-svg.svg" alt="Example 1 SVG" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-sm text-gray-500">Logo Conversion</h3>
                <p className="text-base font-semibold text-gray-900">Clean logo vectorization with shape mode</p>
              </div>
              
              {/* Example 2 */}
              <div className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <div className="grid grid-cols-2 h-full">
                    <div className="border-r border-gray-200 p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">Original</p>
                      <img src="/example2-original.jpg" alt="Example 2 Original" className="w-full h-full object-contain" />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">SVG</p>
                      <img src="/example2-svg.svg" alt="Example 2 SVG" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-sm text-gray-500">Illustration Conversion</h3>
                <p className="text-base font-semibold text-gray-900">Detailed illustration with color quantization</p>
              </div>
              
              {/* Example 3 */}
              <div className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <div className="grid grid-cols-2 h-full">
                    <div className="border-r border-gray-200 p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">Original</p>
                      <img src="/example3-original.jpg" alt="Example 3 Original" className="w-full h-full object-contain" />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium text-gray-500 text-center mb-2">SVG</p>
                      <img src="/example3-svg.svg" alt="Example 3 SVG" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 text-sm text-gray-500">Line Art Conversion</h3>
                <p className="text-base font-semibold text-gray-900">Clean line art using centerline mode</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button
                onClick={()  => router.push('/editor')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try It Yourself
              </button>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to convert your images?</span>
              <span className="block">Start using VTracer today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Our free online tool makes it easy to convert any image to a high-quality SVG.
            </p>
            <div className="mt-8">
              <button
                onClick={() => router.push('/editor')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <span className="text-2xl font-bold text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">VTracer</span>
              </span>
              <p className="text-gray-500 text-base">
                Free online tool for converting images to SVG vector graphics with real-time customization.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="/editor" className="text-base text-gray-500 hover:text-gray-900">
                        Editor
                      </Link>
                    </li>
                    <li>
                      <a href="#examples" className="text-base text-gray-500 hover:text-gray-900">
                        Examples
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        About
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; {new Date().getFullYear()} VTracer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <AdBlockerNotification />
    </div>
  );
}
