
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';

interface FooterAdProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const FooterAd = ({ category, className = '', useRealAds = true }: FooterAdProps) => {
  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'footer', category],
    queryFn: () => fetchAds(category, 'footer', 1),
  });

  if (useRealAds) {
    return (
      <div className={`mt-6 mb-2 mx-auto max-w-3xl ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Sponsored</div>
        <GoogleAdSense
          slot="4567890123" // Replace with your actual ad slot ID for footer ads
          format="auto"
          className="min-h-[90px]"
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
