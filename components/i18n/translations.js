// components/i18n/translations.js
export const translations = {
  en: {
    // Navigation
    home: "Home",
    contact: "Contact Us",
    editor: "Editor",
    
    // Hero Section
    heroTitle1: "Transform Images into",
    heroTitle2: "Scalable Vector Graphics",
    heroDescription: "Convert your images to SVG instantly with our free online tool. Get high-quality vector graphics with real-time customization options.",
    startConverting: "Start Converting",
    viewExamples: "View Examples",
    
    // Features Section
    features: "Features",
    featuresTitle: "Everything you need for perfect SVGs",
    featuresDescription: "Our powerful conversion tool gives you complete control over your vector graphics.",
    instantConversion: "Instant Conversion",
    instantConversionDesc: "Upload your image and get an SVG preview instantly. No waiting, no processing delays.",
    realTimeCustomization: "Real-Time Customization",
    realTimeCustomizationDesc: "Adjust settings and see changes in real-time. Fine-tune your SVG to perfection.",
    highQualityResults: "High-Quality Results",
    highQualityResultsDesc: "Get clean, optimized SVGs that scale perfectly for any use case.",
    
    // Examples Section
    examples: "Examples",
    examplesTitle: "See the transformation",
    examplesDescription: "Check out these before and after examples of our SVG conversion.",
    original: "Original",
    svg: "SVG",
    logoConversion: "Logo Conversion",
    logoConversionDesc: "Clean logo vectorization with shape mode",
    illustrationConversion: "Illustration Conversion",
    illustrationConversionDesc: "Detailed illustration with color quantization",
    
    // Upload Area
    dragDropImages: "Drag & drop your images here",
    dropImagesHere: "Drop your images here",
    orClickToBrowse: "or click to browse",
    fileSupport: "Supports PNG, JPG, GIF, BMP, TIFF, WEBP (max 10MB each)",
    uploadLimit: "Upload up to 10 images at once",
    uploading: "Uploading...",
    complete: "complete",
    
    // Settings Panel
    settings: "Settings",
    mode: "Mode",
    shape: "Shape",
    centerline: "Centerline",
    tolerance: "Tolerance",
    colorQuantization: "Color Quantization",
    layerMode: "Layer Mode",
    stacked: "Stacked",
    cutout: "Cutout",
    pathSimplification: "Path Simplification",
    curveAccuracy: "Curve Accuracy",
    strokeWidthDetection: "Stroke Width Detection",
    backgroundTransparency: "Background Transparency",
    
    // Download Panel
    download: "Download",
    downloadSVG: "Download SVG",
    downloadPNG: "Download PNG",
    fileSize: "File Size",
    
    // Footer
    product: "Product",
    support: "Support",
    company: "Company",
    legal: "Legal",
    about: "About",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Terms of Service",
    faq: "FAQ",
    copyright: "All rights reserved.",
    freeService: "This service is completely free and supported by ad revenue.",
    
    // Contact Form
    contactUs: "Contact Us",
    contactDescription: "Have questions or feedback? We'd love to hear from you.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    messageSent: "Your message has been sent. Thank you!",
    
    // Misc
    loading: "Loading...",
    processing: "Processing...",
    converting: "Converting image to SVG...",
    beforeAfter: "Before & After Comparison"
  },
  
  // German translations
  de: {
    // Navigation
    home: "Startseite",
    contact: "Kontakt",
    editor: "Editor",
    
    // Hero Section
    heroTitle1: "Wandeln Sie Bilder in",
    heroTitle2: "Skalierbare Vektorgrafiken um",
    heroDescription: "Konvertieren Sie Ihre Bilder sofort in SVG mit unserem kostenlosen Online-Tool. Erhalten Sie hochwertige Vektorgrafiken mit Echtzeit-Anpassungsoptionen.",
    startConverting: "Konvertierung starten",
    viewExamples: "Beispiele ansehen",
    
    // Features Section
    features: "Funktionen",
    featuresTitle: "Alles, was Sie für perfekte SVGs benötigen",
    featuresDescription: "Unser leistungsstarkes Konvertierungstool gibt Ihnen vollständige Kontrolle über Ihre Vektorgrafiken.",
    instantConversion: "Sofortige Konvertierung",
    instantConversionDesc: "Laden Sie Ihr Bild hoch und erhalten Sie sofort eine SVG-Vorschau. Keine Wartezeit, keine Verarbeitungsverzögerungen.",
    realTimeCustomization: "Echtzeit-Anpassung",
    realTimeCustomizationDesc: "Passen Sie Einstellungen an und sehen Sie Änderungen in Echtzeit. Optimieren Sie Ihr SVG zur Perfektion.",
    highQualityResults: "Hochwertige Ergebnisse",
    highQualityResultsDesc: "Erhalten Sie saubere, optimierte SVGs, die für jeden Anwendungsfall perfekt skalieren.",
    
    // Examples Section
    examples: "Beispiele",
    examplesTitle: "Sehen Sie die Transformation",
    examplesDescription: "Schauen Sie sich diese Vorher-Nachher-Beispiele unserer SVG-Konvertierung an.",
    original: "Original",
    svg: "SVG",
    logoConversion: "Logo-Konvertierung",
    logoConversionDesc: "Saubere Logo-Vektorisierung mit Form-Modus",
    illustrationConversion: "Illustrations-Konvertierung",
    illustrationConversionDesc: "Detaillierte Illustration mit Farbquantisierung",
    
    // Upload Area
    dragDropImages: "Bilder hierher ziehen & ablegen",
    dropImagesHere: "Bilder hier ablegen",
    orClickToBrowse: "oder klicken zum Durchsuchen",
    fileSupport: "Unterstützt PNG, JPG, GIF, BMP, TIFF, WEBP (max. 10MB pro Datei)",
    uploadLimit: "Laden Sie bis zu 10 Bilder gleichzeitig hoch",
    uploading: "Hochladen...",
    complete: "abgeschlossen",
    
    // Footer
    copyright: "Alle Rechte vorbehalten.",
    freeService: "Dieser Service ist völlig kostenlos und wird durch Werbeeinnahmen unterstützt."
  }
  
  // Additional languages would be added here following the same pattern
};

// Function to get translation
export function getTranslation(language, key, defaultValue = key) {
  if (!translations[language]) {
    return translations.en[key] || defaultValue;
  }
  return translations[language][key] || translations.en[key] || defaultValue;
}
