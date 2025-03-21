
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';

interface SidebarAdsProps {
  category?: string;
}

const SidebarAds = ({ category }: SidebarAdsProps) => {
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'sidebar', category],
    queryFn: () => fetchAds(category, 'sidebar', 2),
  });

  if (isLoading || !ads || ads.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-muted-foreground">Sponsored</h3>
      <div className="space-y-4">
        {ads.map(ad => (
          <AdBanner key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default SidebarAds;
