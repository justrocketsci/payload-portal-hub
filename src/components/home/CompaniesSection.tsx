
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import { mockCompanies } from '@/lib/api';

const CompaniesSection = () => {
  return (
    <section className="py-10">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featuring Top Space Companies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We aggregate payload guides from the most innovative companies in the space industry
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {mockCompanies.map((company, index) => (
            <FadeIn key={company.id} delay={index * 0.1}>
              <div className="glass-card p-4 h-24 flex items-center justify-center transition-all duration-300 hover:shadow-md">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="max-h-10 max-w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
