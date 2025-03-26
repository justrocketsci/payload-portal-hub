
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';
import { useState, useEffect } from 'react';

interface SidebarAdsProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const SidebarAds = ({ category, className = '', useRealAds = true }: SidebarAdsProps) => {
  const [adsVisible, setAdsVisible] = useState(true);
  const [isDevEnvironment, setIsDevEnvironment] = useState(false);
  
  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'sidebar', category],
    queryFn: () => fetchAds(category, 'sidebar', 2),
  });

  // Handle ad visibility in development
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevEnvironment(isDev);
    
    if (isDev && useRealAds) {
      console.log('Sidebar ads loading in development mode');
    }
  }, [useRealAds]);

  if (!adsVisible) {
    return null;
  }

  // In development, always show mock ads for better visual representation
  if (isDevEnvironment) {
    if (isLoading || !ads || ads.length === 0) {
      return null;
    }
    
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          Sponsored (Dev Mode)
        </h3>
        <div className="space-y-4">
          {ads.map(ad => (
            <AdBanner key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    );
  }

  // In production, use real ads if requested
  if (useRealAds) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          Sponsored
        </h3>
        <div className="space-y-4">
          <GoogleAdSense
            slot="2351852666"
            format="auto"
            className="min-h-[250px] w-full"
          />
          
          {/* Second ad with different slot to avoid conflicts */}
          <GoogleAdSense
            slot="2351852666" // Using the same slot ID but could be different
            format="auto"
            className="min-h-[250px] w-full"
          />
        </div>
      </div>
    );
  }

  // Fallback to mock ads
  if (isLoading || !ads || ads.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
        Sponsored
      </h3>
      <div className="space-y-4">
        {ads.map(ad => (
          <AdBanner key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default SidebarAds;
