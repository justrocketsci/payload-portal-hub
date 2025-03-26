
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import CompaniesSection from '@/components/home/CompaniesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedGuides />
      <CompaniesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
