
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
    // Flag to track if we need to clean up
    let isMounted = true;
    
    const loadAd = async () => {
      try {
        // Check if running on client-side
        if (typeof window === 'undefined') {
          console.log('Running on server side, skipping AdSense loading');
          return;
        }

        const isDevelopment = process.env.NODE_ENV === 'development';
        
        // Skip actual ad loading in development
        if (isDevelopment) {
          console.log(`Ad would load in production for slot: ${slot}`);
          return;
        }

        const currentAd = adRef.current;
        if (!currentAd) return;

        // Clear existing content
        if (currentAd.innerHTML) {
          currentAd.innerHTML = '';
        }

        // Create the ad ins element
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', 'ca-pub-8376822577360166');
        adElement.setAttribute('data-ad-slot', slot);
        
        if (format === 'auto' && responsive) {
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
        } else {
          adElement.setAttribute('data-ad-format', format);
        }
        
        // Append the ins element
        currentAd.appendChild(adElement);

        // Create and append the script that pushes the ad
        const pushScript = document.createElement('script');
        pushScript.textContent = '(adsbygoogle = window.adsbygoogle || []).push({});';
        currentAd.appendChild(pushScript);
        
        // Consider ad loaded after a small delay
        setTimeout(() => {
          if (isMounted) {
            setAdLoaded(true);
            console.log(`Ad loaded for slot: ${slot}`);
          }
        }, 1000);
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
        if (isMounted) {
          setAdError(true);
          toast({
            title: "Ad Error",
            description: "There was an issue loading the advertisement",
            variant: "destructive",
          });
        }
      }
    };

    // Ensure the AdSense script is loaded before attempting to load ads
    if (typeof window !== 'undefined') {
      // Check if the script already exists
      if (!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8376822577360166';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        script.onload = () => {
          console.log('AdSense script loaded successfully');
          loadAd();
        };
        
        script.onerror = () => {
          console.error('Failed to load AdSense script');
          setAdError(true);
        };
      } else {
        // Script already exists, load the ad
        loadAd();
      }
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [slot, format, responsive, toast]);

  // Show fallback or placeholder if ad fails to load or we're in development
  if (adError || process.env.NODE_ENV === 'development') {
    return (
      <div className={`ad-placeholder ${className}`} style={{ 
        minHeight: '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.03)',
        border: '1px dashed rgba(0,0,0,0.1)',
        borderRadius: '4px',
        ...style 
      }}>
        <span className="text-xs text-muted-foreground">
          {adError ? 'Ad content unavailable' : 'Ad placeholder (development mode)'}
        </span>
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
