
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
        
        // Initialize adsbygoogle if it doesn't exist yet
        if (!window.adsbygoogle) {
          window.adsbygoogle = window.adsbygoogle || [];
          if (isDevelopment) {
            console.log('Initialized adsbygoogle array in development mode');
          }
        }

        const currentAd = adRef.current;
        if (!currentAd) return;

        // Clear existing ads if any
        if (currentAd.innerHTML) {
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
        
        // Push the command to render ad with error handling
        try {
          // Use a timeout to prevent blocking the UI
          setTimeout(() => {
            if (isMounted) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                console.log(`Ad request sent for slot: ${slot}`);
                setAdLoaded(true);
              } catch (pushError) {
                console.error('Error pushing ad:', pushError);
                setAdError(true);
              }
            }
          }, 0);
        } catch (pushError) {
          console.error('Error pushing ad:', pushError);
          if (isMounted) setAdError(true);
        }
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
        if (isMounted) setAdError(true);
      }
    };

    loadAd();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [slot, format, responsive]);

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
