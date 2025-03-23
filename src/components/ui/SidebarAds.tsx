
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';
import GoogleAdSense from './GoogleAdSense';

interface SidebarAdsProps {
  category?: string;
  className?: string;
  useRealAds?: boolean;
}

const SidebarAds = ({ category, className = '', useRealAds = true }: SidebarAdsProps) => {
  // Still load mock ads as fallback
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'sidebar', category],
    queryFn: () => fetchAds(category, 'sidebar', 2),
  });

  if (useRealAds) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          Sponsored
        </h3>
        <div className="space-y-4">
          <GoogleAdSense
            slot="2351852666" // Updated with your sidebar ad slot ID
            format="auto"
            className="min-h-[250px]"
          />
          
          {/* Optional second ad - can use a different slot ID if you create another sidebar ad unit */}
          <GoogleAdSense
            slot="2351852666" // Using the same sidebar ad slot ID for now
            format="auto"
            className="min-h-[250px]"
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
