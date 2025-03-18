import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import TranslatedText from '../components/i18n/TranslatedText';

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  
  const handleSubmit = async (formData) => {
    setFormStatus({ status: 'submitting', message: '' });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ 
        status: 'success', 
        message: 'Thank you for your message! We will get back to you soon.' 
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Contact Us - Vectorise.Me</title>
        <meta name="description" content="Contact the Vectorise.Me team for support or feedback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            <TranslatedText id="contactTitle" defaultText="Contact Us" />
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                <TranslatedText id="contactInfo" defaultText="Contact Information" />
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                <TranslatedText id="contactInfoDesc" defaultText="Reach out to us with any questions or feedback." />
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    <TranslatedText id="email" defaultText="Email" />
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">jonkarystudio@gmail.com</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    <TranslatedText id="phone" defaultText="Phone" />
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">2036872785</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    <TranslatedText id="about" defaultText="About" />
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <TranslatedText id="aboutDesc" defaultText="Vectorise.Me is a free online tool for converting raster images to SVG. Our service is completely free and supported by ad revenue." />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          <ContactForm onSubmit={handleSubmit} formStatus={formStatus} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
