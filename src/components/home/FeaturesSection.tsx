
import { Search, Globe } from 'lucide-react';
import SlideUp from '@/components/animations/SlideUp';
import FadeIn from '@/components/animations/FadeIn';
import InlineAd from '@/components/ui/InlineAd';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient payload documentation management
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SlideUp className="glass-card p-6" staggerIndex={0}>
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Advanced Search</h3>
            <p className="text-muted-foreground">
              Powerful search capabilities let you find exactly what you need across all guides.
            </p>
          </SlideUp>
          
          <SlideUp className="glass-card p-6" staggerIndex={1}>
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium mb-2">Global Access</h3>
            <p className="text-muted-foreground">
              Access guides from anywhere in the world, at any time, securely and reliably.
            </p>
          </SlideUp>
        </div>
        
        <div className="mt-12">
          <InlineAd />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
