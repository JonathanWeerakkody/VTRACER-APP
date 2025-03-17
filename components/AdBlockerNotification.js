// components/AdBlockerNotification.js
import { useState, useEffect } from 'react';

export default function AdBlockerNotification() {
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple ad blocker detection
    const detectAdBlocker = async () => {
      try {
        // Create a bait element
        const bait = document.createElement('div');
        bait.className = 'ad-placement ad-banner textads banner-ads';
        bait.style.height = '1px';
        bait.style.width = '1px';
        bait.style.position = 'absolute';
        bait.style.left = '-10000px';
        bait.style.top = '-10000px';
        document.body.appendChild(bait);

        // Wait a moment for ad blockers to act
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check if the bait was hidden or removed
        const isBlocked = bait.offsetHeight === 0 || 
                         bait.offsetParent === null || 
                         !document.body.contains(bait);

        if (isBlocked) {
          setIsAdBlockerDetected(true);
          setIsVisible(true);
        }

        // Clean up
        if (document.body.contains(bait)) {
          document.body.removeChild(bait);
        }
      } catch (error) {
        console.error('Error detecting ad blocker:', error);
      }
    };

    detectAdBlocker();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-yellow-100 border-t border-yellow-200 p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-6 w-6 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-yellow-800">
            We've detected that you're using an ad blocker. Our service is free and we rely on ads to keep it running. Please consider disabling your ad blocker for this site.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
