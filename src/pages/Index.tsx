
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Rocket, Globe, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PayloadCard from '@/components/ui/PayloadCard';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import { fetchPayloadGuides, mockCompanies } from '@/lib/api';
import { PayloadGuide } from '@/lib/types';

const Index = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
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
                Your Universal Source for <span className="text-accent">Space Payload</span> Documentation
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
      
      {/* Featured Guides Section */}
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
        </div>
      </section>
      
      {/* Companies Section */}
      <section className="py-16">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Leading Space Companies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We aggregate payload guides from the most innovative companies in the space industry
              </p>
            </div>
          </FadeIn>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {mockCompanies.map((company, index) => (
              <FadeIn key={company.id} delay={index * 0.1}>
                <div className="glass-card p-4 h-24 w-40 flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-h-12 max-w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Standardized Format</h3>
              <p className="text-muted-foreground">
                All guides follow a consistent structure making comparison and research more efficient.
              </p>
            </SlideUp>
            
            <SlideUp className="glass-card p-6" staggerIndex={2}>
              <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Global Access</h3>
              <p className="text-muted-foreground">
                Access guides from anywhere in the world, at any time, securely and reliably.
              </p>
            </SlideUp>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-space-teal/10 to-space-cyan/10 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeIn>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Submit Your Payload Guide?</h2>
                  <p className="text-muted-foreground mb-6">
                    Join the leading space companies that trust our platform to host and distribute their payload documentation.
                  </p>
                  <Link to="/submit">
                    <Button size="lg" className="rounded-full">Get Started</Button>
                  </Link>
                </div>
              </FadeIn>
              
              <div className="relative hidden md:block">
                <FadeIn delay={0.2}>
                  <img 
                    src="https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Space satellite" 
                    className="rounded-lg object-cover h-full w-full"
                  />
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
