
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
