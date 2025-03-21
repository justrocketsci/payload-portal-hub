
import { motion } from 'framer-motion';
import { ExternalLink, Star, Award, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AdProps {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  companyName: string;
  targetUrl: string;
  size: 'small' | 'medium' | 'large';
  position?: 'inline' | 'sidebar' | 'footer';
}

const AdBanner = ({ ad }: { ad: AdProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  const handleAdClick = () => {
    // Log this click for analytics
    console.log(`Ad clicked: ${ad.id} - ${ad.title}`);
    
    // Show a toast notification
    toast({
      title: "Advertisement clicked",
      description: `You clicked on an ad from ${ad.companyName}`,
      duration: 3000,
    });
    
    // Open the target URL in a new tab
    window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
  };
  
  // Different styles based on ad size
  const getSizeStyles = () => {
    switch (ad.size) {
      case 'small':
        return 'h-20 p-2 text-xs';
      case 'medium':
        return 'h-28 sm:h-24 p-3 text-sm';
      case 'large':
        return 'h-40 sm:h-32 p-4 text-base';
      default:
        return 'h-24 p-3 text-sm';
    }
  };
  
  // Choose an icon based on the ad category or size
  const getAdIcon = () => {
    switch (ad.size) {
      case 'large':
        return <Award className="h-3 w-3 text-accent" />;
      case 'medium':
        return <Star className="h-3 w-3 text-accent" />;
      default:
        return <Megaphone className="h-3 w-3 text-accent" />;
    }
  };
  
  return (
    <motion.div
      className={`relative w-full rounded-lg bg-secondary/30 border border-border/50 overflow-hidden ${getSizeStyles()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAdClick}
      whileHover={{ scale: 1.01 }}
      animate={{ opacity: isHovered ? 1 : 0.95 }}
      initial={{ opacity: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-1 right-1 text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
        {getAdIcon()}
        <span>Ad</span>
      </div>
      
      <div className="flex h-full gap-3">
        {ad.imageUrl && (
          <div className="relative h-full aspect-square flex-shrink-0">
            <img 
              src={ad.imageUrl} 
              alt={ad.companyName} 
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
        )}
        
        <div className="flex flex-col justify-center overflow-hidden flex-grow">
          <h4 className="font-medium line-clamp-1">{ad.title}</h4>
          
          {ad.description && ad.size !== 'small' && (
            <p className="text-muted-foreground line-clamp-2 text-xs mt-1 mb-1">
              {ad.description}
            </p>
          )}
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
            <span>{ad.companyName}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </div>
      
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default AdBanner;
