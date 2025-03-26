
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PayloadCard from '@/components/ui/PayloadCard';
import FadeIn from '@/components/animations/FadeIn';
import InlineAd from '@/components/ui/InlineAd';
import { fetchPayloadGuides } from '@/lib/api';
import { PayloadGuide } from '@/lib/types';

const FeaturedGuides = () => {
  const [guides, setGuides] = useState<PayloadGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGuides = async () => {
      try {
        const data = await fetchPayloadGuides();
        setGuides(data.slice(0, 3)); // Just show first 3 on the homepage
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getGuides();
  }, []);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-custom">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Guides</h2>
              <p className="text-muted-foreground">
                Explore our most popular and recently updated payload guides
              </p>
            </div>
            <Link to="/guides" className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders would go here
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card h-[440px] animate-pulse" />
            ))
          ) : (
            guides.map((guide, index) => (
              <PayloadCard key={guide.id} guide={guide} index={index} />
            ))
          )}
        </div>
        
        <div className="mt-12">
          <InlineAd />
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;
