
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PayloadCard from '@/components/ui/PayloadCard';
import FadeIn from '@/components/animations/FadeIn';
import InlineAd from '@/components/ui/InlineAd';
import { fetchPayloadGuides } from '@/lib/api';
import { PayloadGuide } from '@/lib/types';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const FeaturedGuides = () => {
  const [guides, setGuides] = useState<PayloadGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGuides = async () => {
      try {
        const data = await fetchPayloadGuides();
        setGuides(data.slice(0, 6)); // Show more guides (6 instead of 3)
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
        
        {isLoading ? (
          // Skeleton loaders
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card h-[440px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                autoplay: true,
                delay: 4000,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {guides.map((guide, index) => (
                  <CarouselItem key={guide.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <PayloadCard guide={guide} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm" />
            </Carousel>
          </div>
        )}
        
        <div className="mt-12">
          <InlineAd />
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;
