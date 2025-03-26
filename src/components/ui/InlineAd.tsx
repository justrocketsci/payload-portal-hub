
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';
import { useState, useEffect } from 'react';

interface InlineAdProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const InlineAd = ({ category, className = '', useRealAds = true }: InlineAdProps) => {
  const [adVisible, setAdVisible] = useState(true);
  const [isDevEnvironment, setIsDevEnvironment] = useState(false);

  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'inline', category],
    queryFn: () => fetchAds(category, 'inline', 1),
  });

  // Handle ad visibility in development
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevEnvironment(isDev);
    
    if (isDev && useRealAds) {
      console.log('Inline ad loading in development mode');
    }
  }, [useRealAds]);

  if (!adVisible) {
    return null;
  }

  // In development, always show mock ads for better visual representation
  if (isDevEnvironment) {
    if (isLoading || !ads || ads.length === 0) {
      return null;
    }
    
    return (
      <div className={`my-6 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Sponsored Content (Dev Mode)</div>
        <AdBanner ad={ads[0]} />
      </div>
    );
  }

  // In production, use real ads if requested
  if (useRealAds) {
    return (
      <div className={`my-6 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Sponsored Content</div>
        <GoogleAdSense
          slot="3664934338" // Updated back to slot id in Google AdSense
          format="auto"
          className="min-h-[120px] w-full"
        />
      </div>
    );
  }

  // Fallback to mock ads
  if (isLoading || !ads || ads.length === 0) {
    return null;
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="text-xs text-muted-foreground mb-2">Sponsored Content</div>
      <AdBanner ad={ads[0]} />
    </div>
  );
};

export default InlineAd;
