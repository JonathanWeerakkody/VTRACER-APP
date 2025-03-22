// components/i18n/translations.js
export const getTranslation = (language, id, defaultText) => {
  // If the language exists in our translations
  if (translations[language]) {
    // If the specific translation ID exists for this language
    if (translations[language][id]) {
      return translations[language][id];
    }
    
    // If the language exists but the specific ID doesn't, check English
    if (translations['en'][id]) {
      return translations['en'][id];
    }
  }
  
  // Fallback to English or the provided default text
  return translations['en'][id] || defaultText;
};

export const translations = {
  // English translations
  en: {
    // Navigation
    home: "Home",
    contact: "Contact",
    editor: "Editor",
    
    // Hero Section
    heroTitle1: "Transform Images into",
    heroTitle2: "Stunning Vector Graphics",
    heroTitle3: "100% Free SVG Conversion",
    heroDescription: "Convert images to SVG instantly with our free online vectorizer.",
    startConverting: "Start Converting",
    viewExamples: "View Examples",
    
    // Features Section
    features: "Features",
    featuresTitle: "Everything you need for perfect SVGs",
    featuresDescription: "Our powerful conversion tool gives you complete control over your vector graphics.",
    feature1Title: "Instant Conversion",
    feature1Description: "Upload your image and get an SVG preview instantly. No waiting, no processing delays.",
    feature2Title: "Real-time Customization",
    feature2Description: "Adjust settings and see changes in real-time. Tweak your SVG to perfection.",
    feature3Title: "High-Quality Results",
    feature3Description: "Get clean, optimized SVGs that scale perfectly for any use case.",
    ctaTitle: "Start using Vectorise.Me today.",
    ctaDescription: "Convert your images to SVG with our free online tool. No registration required.",
    
    // Examples Section
    examples: "Examples",
    examplesTitle: "See the transformation",
    examplesDescription: "Check out these before and after examples of our SVG conversion.",
    original: "Original",
    svg: "SVG",
    logoConversion: "Logo Conversion",
    logoConversionDesc: "Clean logo vectorization with shape mode",
    photoConversion: "Photo to Vector",
    photoConversionDesc: "Detailed photo with color preservation",
    sketchConversion: "Black & White Sketch",
    sketchConversionDesc: "Simple sketch with clean lines",
    
    // Upload Area
    dragDropImages: "Drag & drop your images here",
    dropImagesHere: "Drop your images here",
    orClickToBrowse: "or click to browse",
    pasteFromClipboard: "to paste from clipboard",
    fileSupport: "Supports PNG, JPG, GIF, BMP, WEBP (max 10MB per file)",
    uploadLimit: "Upload up to 10 images at once",
    uploading: "Uploading...",
    complete: "complete",
    
    // Settings Panel
    settings: "Settings",
    outputMode: "Output Mode",
    bwMode: "B/W",
    grayscaleMode: "Grayscale",
    colorMode: "Color",
    layerMode: "Layer Mode",
    stacked: "Stacked",
    cutout: "Cutout",
    threshold: "Threshold",
    grayLevels: "Number of Gray Levels",
    colorQuantization: "Number of Colors",
    colorPrecision: "Color Precision",
    colorPrecisionDesc: "Number of significant bits to use (1-8).",
    gradientStep: "Gradient Step",
    gradientStepDesc: "Color difference between gradient layers (0-255).",
    filterSpeckle: "Filter Speckle",
    filterSpeckleDesc: "Discard patches smaller than X px in size (1-16).",
    pathSimplification: "Path Simplification",
    advancedSettings: "Advanced Settings",
    curveFitting: "Curve Fitting",
    pixelMode: "Pixel",
    polygonMode: "Polygon",
    splineMode: "Spline",
    cornerThreshold: "Corner Threshold",
    cornerThresholdDesc: "Angle threshold for corners (0-180).",
    lengthThreshold: "Length Threshold",
    lengthThresholdDesc: "Minimum length of a segment (0-10).",
    segmentLength: "Segment Length",
    spliceThreshold: "Splice Threshold",
    spliceThresholdDesc: "Angle threshold for path splicing (0-180).",
    strokeWidthDetection: "Stroke Width Detection",
    backgroundTransparency: "Background Transparency",
    applyToAll: "Apply to All Images",
    applySettings: "Apply Settings",
    resetSettings: "Reset Settings",
    clusteringMode: "Clustering Mode",
    hierarchicalClustering: "Hierarchical Clustering",
    
    // Preview
    preview: "Preview",
    previewNote: "This is a preview based on your current settings. The final SVG may vary slightly.",
    close: "Close",
    
    // Batch Operations
    batchOperations: "Batch Operations",
    filesReadyStatus: "0 of 0 files ready",
    converting: "Converting...",
    convert: "Convert",
    convertAll: "Convert All",
    downloadAllZip: "Download All",
    
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
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSent: "Your message has been sent. Thank you!",
    contactDisclaimer: "We'll respond to your inquiry as soon as possible.",
    
    // Misc
    loading: "Loading...",
    processing: "Processing...",
    converting: "Converting image to SVG...",
    beforeAfter: "Before & After Comparison",
    delete: "Delete",
    dragToCompare: "Drag to compare",
    clickToZoom: "Click to zoom",
    pending: "Pending"
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
    heroTitle3: "100% Kostenlose SVG-Konvertierung",
    heroDescription: "Konvertieren Sie Bilder sofort mit unserem kostenlosen Online-Vektorisierer in SVG.",
    startConverting: "Konvertierung starten",
    viewExamples: "Beispiele ansehen",
    
    // Features Section
    features: "Funktionen",
    featuresTitle: "Alles, was Sie für perfekte SVGs benötigen",
    featuresDescription: "Unser leistungsstarkes Konvertierungstool gibt Ihnen vollständige Kontrolle über Ihre Vektorgrafiken.",
    feature1Title: "Sofortige Konvertierung",
    feature1Description: "Laden Sie Ihr Bild hoch und erhalten Sie sofort eine SVG-Vorschau. Keine Wartezeit, keine Verzögerungen bei der Verarbeitung.",
    feature2Title: "Echtzeit-Anpassung mit Form-Modus",
    feature2Description: "Passen Sie Einstellungen an und sehen Sie Änderungen in Echtzeit. Optimieren Sie Ihr SVG zur Perfektion.",
    feature3Title: "Hochwertige Ergebnisse",
    feature3Description: "Erhalten Sie saubere, optimierte SVGs, die für jeden Anwendungsfall perfekt skalieren.",
    ctaTitle: "Beginnen Sie noch heute mit Vectorise.Me.",
    ctaDescription: "Konvertieren Sie Ihre Bilder mit unserem kostenlosen Online-Tool in SVG. Keine Registrierung erforderlich.",
    
    // Examples Section
    examples: "Beispiele",
    examplesTitle: "Sehen Sie die Transformation",
    examplesDescription: "Schauen Sie sich diese Vorher-Nachher-Beispiele unserer SVG-Konvertierung an.",
    original: "Original",
    svg: "SVG",
    logoConversion: "Logo-Konvertierung",
    logoConversionDesc: "Saubere Logo-Vektorisierung mit Form-Modus",
    photoConversion: "Foto zu Vektor",
    photoConversionDesc: "Detailliertes Foto mit Farberhaltung",
    sketchConversion: "Schwarz-Weiß-Skizze",
    sketchConversionDesc: "Einfache Skizze mit klaren Linien",
    
    // Upload Area
    dragDropImages: "Bilder hierher ziehen & ablegen",
    dropImagesHere: "Bilder hier ablegen",
    orClickToBrowse: "oder klicken zum Durchsuchen",
    pasteFromClipboard: "zum Einfügen aus der Zwischenablage",
    fileSupport: "Unterstützt PNG, JPG, GIF, BMP, WEBP (max. 10MB pro Datei)",
    uploadLimit: "Laden Sie bis zu 10 Bilder gleichzeitig hoch",
    uploading: "Hochladen...",
    complete: "abgeschlossen",
    
    // Settings Panel
    settings: "Einstellungen",
    outputMode: "Ausgabemodus",
    bwMode: "S/W",
    grayscaleMode: "Graustufen",
    colorMode: "Farbe",
    layerMode: "Ebenenmodus",
    stacked: "Gestapelt",
    cutout: "Ausschnitt",
    threshold: "Schwellenwert",
    grayLevels: "Anzahl der Graustufen",
    colorQuantization: "Anzahl der Farben",
    colorPrecision: "Farbpräzision",
    colorPrecisionDesc: "Anzahl der signifikanten Bits (1-8).",
    gradientStep: "Gradientenschritt",
    gradientStepDesc: "Farbunterschied zwischen Gradientenschichten (0-255).",
    filterSpeckle: "Rauschfilter",
    filterSpeckleDesc: "Verwerfe Bereiche kleiner als X px (1-16).",
    pathSimplification: "Pfadvereinfachung",
    advancedSettings: "Erweiterte Einstellungen",
    curveFitting: "Kurvenanpassung",
    pixelMode: "Pixel",
    polygonMode: "Polygon",
    splineMode: "Spline",
    cornerThreshold: "Ecken-Schwellenwert",
    cornerThresholdDesc: "Winkelschwelle für Ecken (0-180).",
    lengthThreshold: "Längenschwelle",
    lengthThresholdDesc: "Minimale Länge eines Segments (0-10).",
    segmentLength: "Segmentlänge",
    spliceThreshold: "Verbindungs-Schwellenwert",
    spliceThresholdDesc: "Winkelschwelle für Pfadverbindungen (0-180).",
    strokeWidthDetection: "Strichbreitenerkennung",
    backgroundTransparency: "Hintergrund-Transparenz",
    applyToAll: "Auf alle Bilder anwenden",
    applySettings: "Einstellungen anwenden",
    resetSettings: "Einstellungen zurücksetzen",
    clusteringMode: "Clustering-Modus",
    hierarchicalClustering: "Hierarchisches Clustering",
    
    // Preview
    preview: "Vorschau",
    previewNote: "Dies ist eine Vorschau basierend auf Ihren aktuellen Einstellungen. Das endgültige SVG kann leicht abweichen.",
    close: "Schließen",
    
    // Batch Operations
    batchOperations: "Stapelverarbeitung",
    filesReadyStatus: "0 von 0 Dateien bereit",
    converting: "Konvertiere...",
    convert: "Konvertieren",
    convertAll: "Alle konvertieren",
    downloadAllZip: "Alle herunterladen",
    
    // Download Panel
    download: "Herunterladen",
    downloadSVG: "SVG herunterladen",
    downloadPNG: "PNG herunterladen",
    fileSize: "Dateigröße",
    
    // Footer
    product: "Produkt",
    support: "Support",
    company: "Unternehmen",
    legal: "Rechtliches",
    about: "Über uns",
    privacy: "Datenschutzrichtlinie",
    cookies: "Cookie-Richtlinie",
    terms: "Nutzungsbedingungen",
    faq: "FAQ",
    copyright: "Alle Rechte vorbehalten.",
    freeService: "Dieser Service ist völlig kostenlos und wird durch Werbeeinnahmen unterstützt.",
    
    // Contact Form
    contactUs: "Kontakt",
    contactDescription: "Haben Sie Fragen oder Feedback? Wir würden gerne von Ihnen hören.",
    name: "Name",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    send: "Nachricht senden",
    sendMessage: "Nachricht senden",
    sending: "Senden...",
    messageSent: "Ihre Nachricht wurde gesendet. Vielen Dank!",
    contactDisclaimer: "Wir werden so schnell wie möglich auf Ihre Anfrage antworten.",
    
    // Misc
    loading: "Laden...",
    processing: "Verarbeitung...",
    converting: "Konvertiere Bild zu SVG...",
    beforeAfter: "Vorher & Nachher Vergleich",
    delete: "Löschen",
    dragToCompare: "Ziehen zum Vergleichen",
    clickToZoom: "Klicken zum Zoomen",
    pending: "Ausstehend"
  },
  
  // Spanish translations
  es: {
    // Navigation
    home: "Inicio",
    contact: "Contacto",
    editor: "Editor",
    
    // Hero Section
    heroTitle1: "Transforme imágenes en",
    heroTitle2: "Gráficos vectoriales escalables",
    heroTitle3: "Conversión SVG 100% gratuita",
    heroDescription: "Convierta imágenes a SVG al instante con nuestro vectorizador en línea gratuito.",
    startConverting: "Comenzar a convertir",
    viewExamples: "Ver ejemplos",
    
    // Features Section
    features: "Características",
    featuresTitle: "Todo lo que necesita para SVGs perfectos",
    featuresDescription: "Nuestra potente herramienta de conversión le da control total sobre sus gráficos vectoriales.",
    feature1Title: "Conversión instantánea",
    feature1Description: "Suba su imagen y obtenga una vista previa SVG al instante. Sin esperas, sin retrasos de procesamiento.",
    feature2Title: "Personalización en tiempo real",
    feature2Description: "Ajuste la configuración y vea los cambios en tiempo real. Perfeccione su SVG a la perfección.",
    feature3Title: "Resultados de alta calidad",
    feature3Description: "Obtenga SVGs limpios y optimizados que se escalan perfectamente para cualquier caso de uso.",
    ctaTitle: "Comience a usar Vectorise.Me hoy.",
    ctaDescription: "Convierta sus imágenes a SVG con nuestra herramienta en línea gratuita. No se requiere registro.",
    
    // Upload Area
    dragDropImages: "Arrastre y suelte sus imágenes aquí",
    dropImagesHere: "Suelte sus imágenes aquí",
    orClickToBrowse: "o haga clic para explorar",
    pasteFromClipboard: "para pegar desde el portapapeles",
    fileSupport: "Compatible con PNG, JPG, GIF, BMP, WEBP (máx. 10MB por archivo)",
    uploadLimit: "Suba hasta 10 imágenes a la vez",
    uploading: "Subiendo...",
    complete: "completado",
    
    // Settings Panel
    settings: "Configuración",
    outputMode: "Modo de salida",
    bwMode: "B/N",
    grayscaleMode: "Escala de grises",
    colorMode: "Color",
    advancedSettings: "Configuración avanzada",
    applySettings: "Aplicar configuración",
    resetSettings: "Restablecer configuración",
    
    // Preview
    preview: "Vista previa",
    
    // Download Panel
    download: "Descargar",
    downloadSVG: "Descargar SVG",
    downloadAllZip: "Descargar todo",
    
    // Contact Form
    contactUs: "Contáctenos",
    name: "Nombre",
    subject: "Asunto",
    message: "Mensaje",
    sendMessage: "Enviar mensaje",
    sending: "Enviando...",
    
    // Misc
    delete: "Eliminar",
    dragToCompare: "Arrastrar para comparar",
    clickToZoom: "Clic para ampliar",
    pending: "Pendiente",
    convert: "Convertir",
    
    // Footer
    copyright: "Todos los derechos reservados.",
    freeService: "Este servicio es completamente gratuito y está financiado por ingresos publicitarios."
  },
  
  // French translations
  fr: {
    // Navigation
    home: "Accueil",
    contact: "Contact",
    editor: "Éditeur",
    
    // Hero Section
    heroTitle1: "Transformez des images en",
    heroTitle2: "Graphiques vectoriels évolutifs",
    heroTitle3: "Conversion SVG 100% gratuite",
    heroDescription: "Convertissez des images en SVG instantanément avec notre vectoriseur en ligne gratuit.",
    startConverting: "Commencer la conversion",
    viewExamples: "Voir des exemples",
    
    // Features Section
    feature1Title: "Conversion instantanée",
    feature1Description: "Téléchargez votre image et obtenez un aperçu SVG instantanément. Pas d'attente, pas de délais de traitement.",
    feature2Title: "Personnalisation en temps réel",
    feature2Description: "Ajustez les paramètres et voyez les changements en temps réel. Affinez votre SVG à la perfection.",
    feature3Title: "Résultats de haute qualité",
    feature3Description: "Obtenez des SVG propres et optimisés qui s'adaptent parfaitement à tous les cas d'utilisation.",
    ctaTitle: "Commencez à utiliser Vectorise.Me aujourd'hui.",
    ctaDescription: "Convertissez vos images en SVG avec no<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
