
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';

interface FooterAdProps {
  category?: string;
  className?: string;
}

const FooterAd = ({ category, className = '' }: FooterAdProps) => {
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'footer', category],
    queryFn: () => fetchAds(category, 'footer', 1),
  });

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
