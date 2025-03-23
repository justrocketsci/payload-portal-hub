
import { useEffect, useRef } from 'react';

interface GoogleAdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAdSense = ({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style = {}, 
  className = '' 
}: GoogleAdSenseProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Skip in development if window.adsbygoogle is not defined
      if (typeof window === 'undefined' || !window.adsbygoogle) {
        console.log('AdSense not available in this environment');
        return;
      }

      const currentAd = adRef.current;
      if (!currentAd) return;

      // Clear existing ads if any
      if (currentAd.childNodes.length > 0) {
        currentAd.innerHTML = '';
      }

      // Create the ad
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.style.width = '100%';
      
      // Set attributes
      adElement.setAttribute('data-ad-client', 'ca-pub-8376822577360166');
      adElement.setAttribute('data-ad-slot', slot);
      
      if (format === 'auto' && responsive) {
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');
      } else {
        adElement.setAttribute('data-ad-format', format);
      }
      
      // Append the ad to our container
      currentAd.appendChild(adElement);
      
      // Push the command to render ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
    }
  }, [slot, format, responsive]);

  return (
    <div ref={adRef} className={className} style={{ overflow: 'hidden', ...style }}>
      {/* AdSense will be inserted here by the useEffect */}
    </div>
  );
};

export default GoogleAdSense;
