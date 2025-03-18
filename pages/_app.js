// pages/_app.js
import '../styles/globals.css'
import Head from 'next/head'
import { LanguageProvider } from '../components/i18n/LanguageContext'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </LanguageProvider>
  ) 
}

export default MyApp
