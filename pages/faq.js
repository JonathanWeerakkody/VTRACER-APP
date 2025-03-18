// pages/faq.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TranslatedText from '../components/i18n/TranslatedText';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>FAQ - Vectorise.Me</title>
        <meta name="description" content="Frequently Asked Questions about Vectorise.Me - Free Online Image to SVG Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="prose prose-indigo max-w-none">
          <div className="space-y-8">
            <div>
              <h2>What is Vectorise.Me?</h2>
              <p>
                Vectorise.Me is a free online tool that converts raster images (like JPG, PNG, GIF) into scalable vector graphics (SVG). 
                Vector graphics can be scaled to any size without losing quality, making them perfect for logos, icons, illustrations, and other graphics.
              </p>
            </div>
            
            <div>
              <h2>How does it work?</h2>
              <p>
                Vectorise.Me uses advanced image processing algorithms to trace the outlines and colors in your raster images and convert them into vector paths. 
                The process involves several steps:
              </p>
              <ol>
                <li>Image preprocessing and optimization</li>
                <li>Color quantization and clustering</li>
                <li>Edge detection and path tracing</li>
                <li>Path simplification and optimization</li>
                <li>SVG generation</li>
              </ol>
              <p>
                The result is a clean, scalable SVG file that preserves the visual appearance of your original image while being fully scalable.
              </p>
            </div>
            
            <div>
              <h2>What file formats can I convert?</h2>
              <p>
                Vectorise.Me supports the following input formats:
              </p>
              <ul>
                <li>PNG</li>
                <li>JPG/JPEG</li>
                <li>GIF</li>
                <li>BMP</li>
                <li>TIFF</li>
                <li>WEBP</li>
              </ul>
              <p>
                The maximum file size for each image is 10MB, and you can upload up to 10 images at once.
              </p>
            </div>
            
            <div>
              <h2>Is Vectorise.Me really free?</h2>
              <p>
                Yes, Vectorise.Me is completely free to use. We support our service through advertising revenue, which allows us to provide high-quality vector conversion without charging users.
              </p>
            </div>
            
            <div>
              <h2>Do I need to create an account?</h2>
              <p>
                No, Vectorise.Me doesn't require any registration or account creation. You can start converting images immediately without signing up.
              </p>
            </div>
            
            <div>
              <h2>What are the different settings and what do they do?</h2>
              <p>
                Vectorise.Me offers several settings to customize your vector output:
              </p>
              
              <h3>Clustering Options</h3>
              <ul>
                <li><strong>B/W vs. Color:</strong> B/W mode creates a black and white vector, while Color mode preserves the colors from your original image.</li>
                <li><strong>Cutout vs. Stacked:</strong> Cutout mode creates shapes that cut out from each other, while Stacked mode layers shapes on top of each other.</li>
              </ul>
              
              <h3>Filter Options</h3>
              <ul>
                <li><strong>Filter Speckle:</strong> Removes small artifacts and noise from the image. Higher values create cleaner results but may lose small details.</li>
                <li><strong>Color Precision:</strong> Controls how accurately colors are preserved. Higher values create more accurate colors but may result in more complex SVGs.</li>
                <li><strong>Gradient Step:</strong> Controls how gradients are handled. Higher values create fewer color layers, resulting in simpler SVGs.</li>
              </ul>
              
              <h3>Curve Fitting Options</h3>
              <ul>
                <li><strong>Pixel/Polygon/Spline:</strong> Determines how paths are created. Pixel mode preserves pixel edges, Polygon creates straight line segments, and Spline creates smooth curves.</li>
                <li><strong>Corner Threshold:</strong> Controls how sharp corners are detected. Higher values create smoother curves with fewer corners.</li>
                <li><strong>Segment Length:</strong> Controls the length of path segments. Higher values create more coarse paths with fewer points.</li>
                <li><strong>Splice Threshold:</strong> Controls how paths are joined. Higher values create simpler paths but may be less accurate.</li>
              </ul>
              
              <h3>Additional Options</h3>
              <ul>
                <li><strong>Stroke Width Detection:</strong> Attempts to detect and preserve stroke widths in the original image.</li>
                <li><strong>Background Transparency:</strong> Makes the background transparent in the output SVG.</li>
              </ul>
            </div>
            
            <div>
              <h2>What's the technology behind Vectorise.Me?</h2>
              <p>
                Vectorise.Me is powered by VTracer, an open-source image vectorization library developed by the VisionCortex team. VTracer uses advanced computer vision algorithms to analyze images and convert them into vector paths.
              </p>
              <p>
                The core technology involves:
              </p>
              <ul>
                <li><strong>Color Quantization:</strong> Reducing the number of colors in the image while preserving visual quality</li>
                <li><strong>Image Segmentation:</strong> Dividing the image into regions based on color and shape</li>
                <li><strong>Contour Tracing:</strong> Finding the outlines of shapes in the image</li>
                <li><strong>Path Optimization:</strong> Simplifying and smoothing paths to create clean vector output</li>
              </ul>
              <p>
                Our web interface makes this powerful technology accessible to everyone without requiring any technical knowledge or software installation.
              </p>
            </div>
            
            <div>
              <h2>How can I get the best results?</h2>
              <p>
                For best results with Vectorise.Me:
              </p>
              <ul>
                <li>Start with high-quality, clean images</li>
                <li>Use images with clear, distinct shapes and colors</li>
                <li>Experiment with different settings to find the best combination for your specific image</li>
                <li>For logos and simple graphics, try the B/W mode with higher path simplification</li>
                <li>For colorful illustrations, use Color mode with appropriate color precision</li>
                <li>Use the preview to check results before downloading</li>
              </ul>
            </div>
            
            <div>
              <h2>What can I do with the SVG files?</h2>
              <p>
                SVG files created with Vectorise.Me can be used for:
              </p>
              <ul>
                <li>Logos and branding materials</li>
                <li>Website graphics and icons</li>
                <li>Print materials (posters, business cards, etc.)</li>
                <li>T-shirt designs and merchandise</li>
                <li>Laser cutting and CNC machining</li>
                <li>Animation and interactive web content</li>
              </ul>
              <p>
                SVGs can be edited with vector graphics software like Adobe Illustrator, Inkscape, or Figma, allowing you to further customize and refine your graphics.
              </p>
            </div>
            
            <div>
              <h2>How do I contact support?</h2>
              <p>
                If you have any questions, feedback, or issues with Vectorise.Me, you can contact us at:
              </p>
              <p>
                Email: jonkarystudio@gmail.com<br />
                Phone: 2036872785
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
