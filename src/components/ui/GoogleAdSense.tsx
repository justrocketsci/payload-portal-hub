
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Check if adsbygoogle is available
      if (typeof window === 'undefined') {
        console.log('Running on server side, skipping AdSense loading');
        return;
      }

      // For development environments without AdSense
      if (!window.adsbygoogle) {
        console.log('AdSense not available in this environment');
        setAdError(true);
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
      adElement.style.height = format === 'auto' ? 'auto' : '100%';
      adElement.style.minHeight = '90px';
      
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
      
      // Track ad loading attempt
      setAdLoaded(false);
      setAdError(false);
      
      // Push the command to render ad with error handling
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`Ad request sent for slot: ${slot}`);
        setAdLoaded(true);
      } catch (pushError) {
        console.error('Error pushing ad:', pushError);
        setAdError(true);
      }
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
      setAdError(true);
    }
  }, [slot, format, responsive]);

  // Show fallback or placeholder if ad fails to load
  if (adError) {
    return (
      <div className={`ad-error-placeholder ${className}`} style={{ 
        minHeight: '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.03)',
        border: '1px dashed rgba(0,0,0,0.1)',
        borderRadius: '4px',
        ...style 
      }}>
        <span className="text-xs text-muted-foreground">Ad content unavailable</span>
      </div>
    );
  }

  return (
    <div 
      ref={adRef} 
      className={className} 
      style={{ 
        overflow: 'hidden', 
        minHeight: '90px',
        ...style 
      }}
    >
      {/* AdSense will be inserted here by the useEffect */}
    </div>
  );
};

export default GoogleAdSense;
