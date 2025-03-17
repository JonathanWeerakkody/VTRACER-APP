// pages/contact.js
import Head from 'next/head';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import AdBlockerNotification from '../components/AdBlockerNotification';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us - VTracer</title>
        <meta name="description" content="Contact the VTracer team for support or inquiries" />
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
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/editor" className="text-gray-500 hover:text-gray-900">Editor</Link>
              <Link href="/contact" className="text-indigo-600 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <ContactForm />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} VTracer. All rights reserved.
          </p>
        </div>
      </footer>
      
      <AdBlockerNotification />
    </div>
  );
}
