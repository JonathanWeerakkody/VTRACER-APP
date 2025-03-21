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
    heroDescription: "Convert PNG, JPG, and photos to SVG instantly with our free online vectorizer. Get high-quality vector graphics with real-time customization options.",
    startConverting: "Start Converting",
    viewExamples: "View Examples",
    
    // Features Section
    features: "Features",
    featuresTitle: "Everything you need for perfect SVGs",
    featuresDescription: "Our powerful conversion tool gives you complete control over your vector graphics.",
    instantConversion: "Instant Conversion",
    instantConversionDesc: "Upload your image and get an SVG preview instantly. No waiting, no processing delays.",
    realTimeCustomization: "Real-time Customization",
    realTimeCustomizationDesc: "Adjust settings and see changes in real-time. Tweak your SVG to perfection.",
    highQualityResults: "High Quality Results",
    highQualityResultsDesc: "Get clean, optimized SVGs that scale perfectly for any use case.",
    
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
    fileSupport: "Supports PNG, JPG, GIF, BMP, TIFF, WEBP (max 10MB each)",
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
    gradientStep: "Gradient Step",
    filterSpeckle: "Filter Speckle",
    pathSimplification: "Path Simplification",
    advancedSettings: "Advanced Settings",
    curveFitting: "Curve Fitting",
    pixelMode: "Pixel",
    polygonMode: "Polygon",
    splineMode: "Spline",
    cornerThreshold: "Corner Threshold",
    segmentLength: "Segment Length",
    spliceThreshold: "Splice Threshold",
    strokeWidthDetection: "Stroke Width Detection",
    backgroundTransparency: "Background Transparency",
    applyToAll: "Apply to All Images",
    
    // Preview
    preview: "Preview",
    previewNote: "This is a preview based on your current settings. The final SVG may vary slightly.",
    close: "Close",
    
    // Batch Operations
    batchOperations: "Batch Operations",
    filesReadyStatus: "0 of 0 files ready",
    converting: "Converting...",
    convertAll: "Convert All",
    downloadAllZip: "Download All (.zip)",
    
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
    messageSent: "Your message has been sent. Thank you!",
    
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
  
  // Arabic translations
  ar: {
    // Navigation
    home: "الرئيسية",
    contact: "اتصل بنا",
    editor: "المحرر",
    
    // Hero Section
    heroTitle1: "حوّل الصور إلى",
    heroTitle2: "رسومات متجهية قابلة للتحجيم",
    heroTitle3: "تحويل SVG مجاني 100%",
    heroDescription: "حوّل صورك إلى SVG فورًا باستخدام أداتنا المجانية عبر الإنترنت. لا تسجيل مطلوب، لا رسوم، لا حدود.",
    startConverting: "ابدأ التحويل",
    viewExamples: "عرض الأمثلة",
    
    // Features Section
    features: "المميزات",
    featuresTitle: "كل ما تحتاجه للحصول على SVG مثالي",
    featuresDescription: "توفر أداة التحويل القوية لدينا تحكمًا كاملاً في الرسومات المتجهية الخاصة بك.",
    instantConversion: "تحويل فوري",
    instantConversionDesc: "قم بتحميل صورتك واحصل على معاينة SVG فورًا. لا انتظار، لا تأخير في المعالجة.",
    realTimeCustomization: "تخصيص في الوقت الفعلي",
    realTimeCustomizationDesc: "اضبط الإعدادات وشاهد التغييرات في الوقت الفعلي. عدّل SVG الخاص بك للكمال.",
    highQualityResults: "نتائج عالية الجودة",
    highQualityResultsDesc: "احصل على ملفات SVG نظيفة ومحسنة تتناسب بشكل مثالي مع أي حالة استخدام.",
    
    // Examples Section
    examples: "أمثلة",
    examplesTitle: "شاهد التحويل",
    examplesDescription: "تحقق من أمثلة قبل وبعد لتحويل SVG لدينا.",
    original: "الأصلي",
    svg: "SVG",
    logoConversion: "تحويل الشعار",
    logoConversionDesc: "تحويل الشعار النظيف بوضع الشكل",
    photoConversion: "تحويل الصورة إلى متجه",
    photoConversionDesc: "صورة مفصلة مع الحفاظ على الألوان",
    sketchConversion: "رسم أبيض وأسود",
    sketchConversionDesc: "رسم بسيط بخطوط نظيفة",
    
    // Upload Area
    dragDropImages: "اسحب وأفلت صورك هنا",
    dropImagesHere: "أفلت صورك هنا",
    orClickToBrowse: "أو انقر للتصفح",
    fileSupport: "يدعم PNG، JPG، GIF، BMP، TIFF، WEBP (بحد أقصى 10 ميجابايت لكل منها)",
    uploadLimit: "قم بتحميل ما يصل إلى 10 صور في وقت واحد",
    uploading: "جاري التحميل...",
    complete: "اكتمل",
    
    // Settings Panel
    settings: "الإعدادات",
    outputMode: "وضع الإخراج",
    bwMode: "أبيض وأسود",
    grayscaleMode: "تدرج رمادي",
    colorMode: "ملون",
    layerMode: "وضع الطبقة",
    stacked: "متراكم",
    cutout: "مقطوع",
    threshold: "العتبة",
    grayLevels: "عدد مستويات الرمادي",
    colorQuantization: "عدد الألوان",
    colorPrecision: "دقة الألوان",
    gradientStep: "خطوة التدرج",
    filterSpeckle: "تصفية البقع",
    pathSimplification: "تبسيط المسار",
    advancedSettings: "إعدادات متقدمة",
    curveFitting: "تناسب المنحنى",
    pixelMode: "بكسل",
    polygonMode: "مضلع",
    splineMode: "منحنى",
    cornerThreshold: "عتبة الزاوية",
    segmentLength: "طول القطعة",
    spliceThreshold: "عتبة الربط",
    strokeWidthDetection: "اكتشاف عرض الخط",
    backgroundTransparency: "شفافية الخلفية",
    applyToAll: "تطبيق على جميع الصور",
    
    // Preview
    preview: "معاينة",
    previewNote: "هذه معاينة بناءً على إعداداتك الحالية. قد يختلف SVG النهائي قليلاً.",
    close: "إغلاق",
    
    // Batch Operations
    batchOperations: "عمليات المجموعة",
    filesReadyStatus: "0 من 0 ملفات جاهزة",
    converting: "جاري التحويل...",
    convertAll: "تحويل الكل",
    downloadAllZip: "تنزيل الكل (.zip)",
    
    // Download Panel
    download: "تنزيل",
    downloadSVG: "تنزيل SVG",
    downloadPNG: "تنزيل PNG",
    fileSize: "حجم الملف",
    
    // Footer
    product: "المنتج",
    support: "الدعم",
    company: "الشركة",
    legal: "قانوني",
    about: "حول",
    privacy: "سياسة الخصوصية",
    cookies: "سياسة ملفات تعريف الارتباط",
    terms: "شروط الخدمة",
    faq: "الأسئلة الشائعة",
    copyright: "جميع الحقوق محفوظة.",
    freeService: "هذه الخدمة مجانية تمامًا ومدعومة بعائدات الإعلانات.",
    
    // Contact Form
    contactUs: "اتصل بنا",
    contactDescription: "هل لديك أسئلة أو ملاحظات؟ نود أن نسمع منك.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال الرسالة",
    messageSent: "تم إرسال رسالتك. شكرًا لك!",
    
    // Misc
    loading: "جاري التحميل...",
    processing: "جاري المعالجة...",
    converting: "جاري تحويل الصورة إلى SVG...",
    beforeAfter: "مقارنة قبل وبعد",
    delete: "حذف",
    dragToCompare: "اسحب للمقارنة",
    clickToZoom: "انقر للتكبير",
    pending: "قيد الانتظار"
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
    heroDescription: "Konvertieren Sie Ihre Bilder sofort in SVG mit unserem völlig kostenlosen Online-Tool. Keine Registrierung erforderlich, keine Gebühren, keine Grenzen.",
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
    photoConversion: "Foto zu Vektor",
    photoConversionDesc: "Detailliertes Foto mit Farberhaltung",
    sketchConversion: "Schwarz-Weiß-Skizze",
    sketchConversionDesc: "Einfache Skizze mit klaren Linien",
    
    // Upload Area
    dragDropImages: "Bilder hierher ziehen & ablegen",
    dropImagesHere: "Bilder hier ablegen",
    orClickToBrowse: "oder klicken zum Durchsuchen",
    fileSupport: "Unterstützt PNG, JPG, GIF, BMP, TIFF, WEBP (max. 10MB pro Datei)",
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
    gradientStep: "Gradientenschritt",
    filterSpeckle: "Rauschfilter",
    pathSimplification: "Pfadvereinfachung",
    advancedSettings: "Erweiterte Einstellungen",
    curveFitting: "Kurvenanpassung",
    pixelMode: "Pixel",
    polygonMode: "Polygon",
    splineMode: "Spline",
    cornerThreshold: "Ecken-Schwellenwert",
    segmentLength: "Segmentlänge",
    spliceThreshold: "Verbindungs-Schwellenwert",
    strokeWidthDetection: "Strichbreitenerkennung",
    backgroundTransparency: "Hintergrund-Transparenz",
    applyToAll: "Auf alle Bilder anwenden",
    
    // Preview
    preview: "Vorschau",
    previewNote: "Dies ist eine Vorschau basierend auf Ihren aktuellen Einstellungen. Das endgültige SVG kann leicht abweichen.",
    close: "Schließen",
    
    // Batch Operations
    batchOperations: "Stapelverarbeitung",
    filesReadyStatus: "0 von 0 Dateien bereit",
    converting: "Konvertiere...",
    convertAll: "Alle konvertieren",
    downloadAllZip: "Alle herunterladen (.zip)",
    
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
    
    // Misc
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
    heroDescription: "Convierta sus imágenes a SVG al instante con nuestra herramienta en línea completamente gratuita. Sin registro, sin tarifas, sin límites.",
    startConverting: "Comenzar a convertir",
    viewExamples: "Ver ejemplos",
    
    // Preview
    preview: "Vista previa",
    
    // Misc
    delete: "Eliminar",
    dragToCompare: "Arrastrar para comparar",
    clickToZoom: "Clic para ampliar",
    pending: "Pendiente",
    
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
    heroDescription: "Convertissez vos images en SVG instantanément avec notre outil en ligne totalement gratuit. Pas d'inscription, pas de frais, pas de limites.",
    startConverting: "Commencer la conversion",
    viewExamples: "Voir des exemples",
    
    // Preview
    preview: "Aperçu",
    
    // Misc
    delete: "Supprimer",
    dragToCompare: "Glisser pour comparer",
    clickToZoom: "Cliquer pour zoomer",
    pending: "En attente",
    
    // Footer
    copyright: "Tous droits réservés.",
    freeService: "Ce service est entièrement gratuit et financé par la publicité."
  }
  
  // Add other languages with similar structure
  // ...
};
