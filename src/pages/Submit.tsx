
import { MoveRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SubmissionForm from '@/components/ui/SubmissionForm';
import SlideUp from '@/components/animations/SlideUp';

const Submit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container-custom">
          <SlideUp>
            <div className="flex items-center gap-2 text-sm mb-2">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <MoveRight className="h-3 w-3 text-muted-foreground" />
              <span>Submit Guide</span>
            </div>
          </SlideUp>
          
          <SlideUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Submit Your Payload Guide</h1>
          </SlideUp>
          
          <SlideUp delay={0.2}>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              Share your company's payload documentation with the space community.
              All submissions are reviewed before being published.
            </p>
          </SlideUp>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 flex-grow">
        <div className="container-custom">
          <SubmissionForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Submit;
