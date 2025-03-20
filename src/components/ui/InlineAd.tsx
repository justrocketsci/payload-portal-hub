
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import AdBanner from './AdBanner';

interface InlineAdProps {
  category?: string;
  className?: string;
}

const InlineAd = ({ category, className = '' }: InlineAdProps) => {
  const { data: ads, isLoading } = useQuery({
    queryKey: ['ads', 'inline', category],
    queryFn: () => fetchAds(category, 'inline', 1),
  });

  if (isLoading || !ads || ads.length === 0) {
    return null;
  }

  return (
    <div className={`my-6 border-4 border-dashed border-red-400 p-4 rounded-lg ${className}`}>
      <div className="text-xs text-red-500 font-bold mb-2">AD PLACEMENT (INLINE)</div>
      <AdBanner ad={ads[0]} />
    </div>
  );
};

export default InlineAd;
