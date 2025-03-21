
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PayloadGuide } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface PayloadCardProps {
  guide: PayloadGuide;
  index?: number;
}

const PayloadCard = ({ guide, index = 0 }: PayloadCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Use a fallback image if the thumbnail is missing or fails to load
  const thumbnailImage = imageError 
    ? 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80'
    : guide.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnailImage} 
          alt={guide.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className="px-2 py-1 text-xs rounded-full bg-accent/90 text-white backdrop-blur-sm">
            {guide.category}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/40"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 text-xs rounded-lg bg-white/20 backdrop-blur-sm text-white flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {guide.lastUpdated}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {guide.company}
          </span>
        </div>
        
        <h3 className="font-medium text-lg mb-2 line-clamp-2">
          {guide.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {guide.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/guides/${guide.id}`}
          className="block w-full"
        >
          <Button 
            variant="outline" 
            className="w-full transition-all border-input hover:border-accent hover:text-accent"
          >
            View Guide
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PayloadCard;
