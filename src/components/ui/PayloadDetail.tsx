
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Download, Share2, Bookmark, Clock, FileText, Tag, ExternalLink } from 'lucide-react';
import { PayloadGuide } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PayloadDetailProps {
  guide: PayloadGuide;
}

const PayloadDetail = ({ guide }: PayloadDetailProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  // Add error handling for the hero image
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle bookmark clicks
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked 
        ? `${guide.title} has been removed from your bookmarks.` 
        : `${guide.title} has been added to your bookmarks.`,
      duration: 3000,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide.title,
          text: `Check out this payload guide: ${guide.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Guide link copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handleDownload = () => {
    if (!guide.fileUrl) {
      toast({
        title: "Download error",
        description: "File not available for download",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setDownloading(true);
    
    toast({
      title: "Download started",
      description: `${guide.title} is downloading...`,
      duration: 3000,
    });

    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = guide.fileUrl;
    link.setAttribute('download', `${guide.title.replace(/\s+/g, '_')}.${guide.fileType?.toLowerCase()}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    
    // For browsers that require the link to be in the document
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset downloading state after a short delay
    setTimeout(() => setDownloading(false), 1000);
  };

  const handleExternalView = () => {
    if (guide.externalUrl) {
      window.open(guide.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Use a default backdrop if the thumbnail is missing or fails to load
  const backdropImage = imageError 
    ? 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80'
    : guide.thumbnail;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden">
        <img 
          src={backdropImage} 
          alt={guide.title}
          className="w-full h-full object-cover object-center"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 text-sm rounded-full bg-accent/90 text-white">
                {guide.category}
              </span>
              <span className="text-white/80 flex items-center gap-1 text-sm">
                <CalendarClock className="h-4 w-4" />
                Updated: {guide.lastUpdated}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
              {guide.title}
            </h1>
            
            <p className="text-white/90 text-lg max-w-3xl mb-6">
              {guide.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                onClick={handleDownload}
                disabled={downloading || !guide.fileUrl}
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-6"
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading ? 'Downloading...' : 'Download Guide'}
              </Button>
              
              {guide.externalUrl && (
                <Button 
                  variant="outline" 
                  onClick={handleExternalView}
                  className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on {guide.company}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleBookmark}
                className={`rounded-full backdrop-blur-sm ${
                  bookmarked 
                    ? 'bg-white/20 border-accent text-accent hover:bg-white/30' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? 'fill-accent' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-medium mb-4">About This Guide</h2>
              <p className="text-muted-foreground mb-4">
                This comprehensive payload user guide provides essential information for mission planning, 
                technical specifications, interface requirements, and integration procedures. 
                It's designed to facilitate smooth coordination between launch providers and payload 
                developers, ensuring mission success.
              </p>
              <p className="text-muted-foreground">
                The document covers environmental conditions, safety requirements, testing procedures, 
                and operational constraints. It serves as the authoritative reference for all technical 
                aspects of payload integration with the launch system.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-medium mb-6">Guide Contents</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Introduction and Overview</h3>
                    <p className="text-sm text-muted-foreground">General information about the launch vehicle and services</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Performance and Capabilities</h3>
                    <p className="text-sm text-muted-foreground">Launch vehicle performance, orbit insertion accuracy, payload capacity</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Environments</h3>
                    <p className="text-sm text-muted-foreground">Mechanical, thermal, electromagnetic, and other environmental conditions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Interfaces and Integration</h3>
                    <p className="text-sm text-muted-foreground">Mechanical and electrical interfaces, integration procedures</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mission Planning and Operations</h3>
                    <p className="text-sm text-muted-foreground">Launch windows, orbital considerations, mission constraints</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="font-medium mb-4">Document Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-medium">{guide.publishedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{guide.lastUpdated}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Type</p>
                    <p className="font-medium">{guide.fileType}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{guide.fileSize}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="font-medium mb-4">Tags</h3>
              
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass-card p-6"
            >
              <h3 className="font-medium mb-4">Company Information</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://logo.clearbit.com/${guide.company.toLowerCase().replace(' ', '')}.com`} 
                    alt={guide.company}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/eee/999?text=' + guide.company.charAt(0);
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium">{guide.company}</h4>
                  <p className="text-sm text-muted-foreground">Launch Provider</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View All Guides from {guide.company}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayloadDetail;
