// pages/terms.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TranslatedText from '../components/i18n/TranslatedText';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Terms of Service - Vectorise.Me</title>
        <meta name="description" content="Terms of Service for Vectorise.Me - Free Online Image to SVG Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-indigo max-w-none">
          <p>Last updated: March 18, 2025</p>
          
          <h2>Introduction</h2>
          <p>
            Welcome to Vectorise.Me. These Terms of Service ("Terms") govern your use of our website and services. By using Vectorise.Me, you agree to these Terms. If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2>Use of Service</h2>
          <p>
            Vectorise.Me provides an online tool for converting raster images to scalable vector graphics (SVG). Our service is provided "as is" and "as available" without any warranties, expressed or implied.
          </p>
          <p>
            You are responsible for ensuring that your use of our service complies with all applicable laws and regulations. You may not use our service for any illegal or unauthorized purpose.
          </p>
          
          <h2>User Content</h2>
          <p>
            When you upload images to Vectorise.Me, you retain all ownership rights to your content. However, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your content for the purpose of providing our service to you.
          </p>
          <p>
            You represent and warrant that:
          </p>
          <ul>
            <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use your content</li>
            <li>Your content does not violate or infringe upon the rights of any third party, including copyright, trademark, privacy, publicity, or other personal or proprietary rights</li>
          </ul>
          
          <h2>Intellectual Property</h2>
          <p>
            The Vectorise.Me service, including its original content, features, and functionality, is owned by JonkaryStudio and is protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Vectorise.Me, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2>Termination</h2>
          <p>
            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
