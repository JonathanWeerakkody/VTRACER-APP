import '../styles/globals.css';
import '../styles/responsive.css';
import '../styles/animations.css';
import { LanguageProvider } from '../components/i18n/LanguageContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        {/* Google AdSense Script */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
        />
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
