
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import SlideUp from '@/components/animations/SlideUp';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SlideUp>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              The Premier Payload Guide Repository
            </span>
          </SlideUp>
          
          <SlideUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Your Universal Source for <span className="text-accent">Payload User Guides</span>
            </h1>
          </SlideUp>
          
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Accelerate your mission planning with comprehensive access to standardized payload guides from leading space companies.
            </p>
          </SlideUp>
          
          <SlideUp delay={0.3}>
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar placeholder="Search for guides by company, vehicle, or keyword..." />
            </div>
          </SlideUp>
          
          <SlideUp delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/guides">
                <Button size="lg" className="rounded-full gap-2">
                  Browse All Guides
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/submit">
                <Button variant="outline" size="lg" className="rounded-full gap-2">
                  Submit Your Guide
                  <FileText className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 bg-gradient-to-b from-secondary/50 to-transparent"></div>
      <motion.div
        className="absolute top-20 -right-28 w-96 h-96 rounded-full bg-accent/5 -z-10"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-20 -left-28 w-64 h-64 rounded-full bg-primary/5 -z-10"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </section>
  );
};

export default Hero;
