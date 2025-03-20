// pages/cookies.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TranslatedText from '../components/i18n/TranslatedText';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Cookie Policy - Vectorise.Me</title>
        <meta name="description" content="Cookie Policy for Vectorise.Me - Free Online Image to SVG Converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-indigo max-w-none">
          <p>Last updated: March 18, 2025</p>
          
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
          </p>
          
          <h2>How Vectorise.Me Uses Cookies</h2>
          <p>
            When you use and access our service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> These cookies are required for the operation of our website. They include, for example, cookies that enable you to use our service.</li>
            <li><strong>Preferences cookies:</strong> These cookies allow us to remember choices you make when you use our website, such as remembering your language preferences or settings.</li>
            <li><strong>Analytics cookies:</strong> These cookies allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.</li>
            <li><strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</li>
          </ul>
          
          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.
          </p>
          
          <h2>What Are Your Choices Regarding Cookies</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
          </p>
          <p>
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
          
          <h2>Where Can You Find More Information About Cookies</h2>
          <p>
            You can learn more about cookies and the following third-party websites:
          </p>
          <ul>
            <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">https://www.allaboutcookies.org/</a></li>
            <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer">https://www.networkadvertising.org/</a></li>
          </ul>
          
          <h2>Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us through our contact form on the website.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
