
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';
import { useState, useEffect } from 'react';

interface FooterAdProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const FooterAd = ({ category, className = '', useRealAds = true }: FooterAdProps) => {
  const [adVisible, setAdVisible] = useState(true);
  
  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'footer', category],
    queryFn: () => fetchAds(category, 'footer', 1),
  });

  // Handle ad visibility in development
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev && useRealAds) {
      console.log('Footer ad loading in development mode');
    }
  }, [useRealAds]);

  if (!adVisible) {
    return null;
  }

  if (useRealAds) {
    return (
      <div className={`mt-6 mb-2 mx-auto max-w-3xl ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Sponsored</div>
        <GoogleAdSense
          slot="1038770992" 
          format="auto"
          className="min-h-[90px] w-full"
        />
      </div>
    );
  }

  // Fallback to mock ads
  if (isLoading || !ads || ads.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 mb-2 mx-auto max-w-3xl ${className}`}>
      <div className="text-xs text-muted-foreground mb-2">Sponsored</div>
      <AdBanner ad={ads[0]} />
    </div>
  );
};

export default FooterAd;
