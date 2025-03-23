
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';
import { useState } from 'react';

interface InlineAdProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const InlineAd = ({ category, className = '', useRealAds = true }: InlineAdProps) => {
  const [adLoaded, setAdLoaded] = useState(false);

  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'inline', category],
    queryFn: () => fetchAds(category, 'inline', 1),
  });

  if (useRealAds) {
    return (
      <div className={`my-6 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Sponsored Content</div>
        <GoogleAdSense
          slot="366493438" // Updated with your actual ad slot ID
          format="auto"
          className="min-h-[120px]"
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
