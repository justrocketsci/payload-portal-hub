
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';

interface SidebarAdsProps {
  category?: string;
  className?: string;
}

const SidebarAds = ({ category, className = '' }: SidebarAdsProps) => {
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'sidebar', category],
    queryFn: () => fetchAds(category, 'sidebar', 2),
  });

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
