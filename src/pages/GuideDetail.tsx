
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PayloadDetail from '@/components/ui/PayloadDetail';
import { fetchPayloadGuideById } from '@/lib/api';
import { PayloadGuide } from '@/lib/types';
import SlideUp from '@/components/animations/SlideUp';

const GuideDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<PayloadGuide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!id) {
          throw new Error('Guide ID is required');
        }
        
        const data = await fetchPayloadGuideById(id);
        
        if (!data) {
          throw new Error('Guide not found');
        }
        
        setGuide(data);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError(err instanceof Error ? err.message : 'Failed to load guide');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="glass-card p-8 text-center">
            <div className="h-12 w-12 rounded-full border-4 border-transparent border-t-accent animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading guide details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="glass-card p-8 text-center max-w-md">
            <h2 className="text-2xl font-medium mb-4">Guide Not Found</h2>
            <p className="text-muted-foreground mb-6">
              {error || "The requested payload guide could not be found."}
            </p>
            <button
              onClick={() => navigate('/guides')}
              className="btn-primary"
            >
              Browse All Guides
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-20">
        <div className="container-custom py-4">
          <SlideUp>
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <MoveRight className="h-3 w-3 text-muted-foreground" />
              <a href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                Guides
              </a>
              <MoveRight className="h-3 w-3 text-muted-foreground" />
              <span className="truncate max-w-[200px]">{guide.title}</span>
            </div>
          </SlideUp>
        </div>
        
        <PayloadDetail guide={guide} />
      </div>
      
      <Footer />
    </div>
  );
};

export default GuideDetail;
