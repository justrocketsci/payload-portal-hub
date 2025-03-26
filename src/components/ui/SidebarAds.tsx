
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
    queryFn: () => fetchAds(category, 'sidebar', 1), // Changed to only request 1 ad
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
          {/* Only show the first ad */}
          {ads.length > 0 && <AdBanner key={ads[0].id} ad={ads[0]} />}
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
          {/* Only show one ad unit */}
          <GoogleAdSense
            slot="2351852666"
            format="auto"
            className="min-h-[450px] w-full" // Increased height for a single more prominent ad
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
        {/* Only show the first ad */}
        {ads.length > 0 && <AdBanner key={ads[0].id} ad={ads[0]} />}
      </div>
    </div>
  );
};

export default SidebarAds;
