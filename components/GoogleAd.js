import React from 'react';

// Google Ad component
const GoogleAd = ({ slot, format = 'auto', responsive = true, className = '' }) => {
  return (
    <div className={`google-ad ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1234567890123456" // Replace with actual ad client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
      <script dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `
      }} />
    </div>
  );
};

export default GoogleAd;
