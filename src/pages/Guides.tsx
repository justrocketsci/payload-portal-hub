
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import PayloadCard from '@/components/ui/PayloadCard';
import SlideUp from '@/components/animations/SlideUp';
import { fetchPayloadGuides, filterPayloadGuides, searchPayloadGuides } from '@/lib/api';
import { PayloadGuide, FilterOptions } from '@/lib/types';

const Guides = () => {
  const [guides, setGuides] = useState<PayloadGuide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<PayloadGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    companies: [],
    tags: []
  });

  // Extraction of unique values for filter options
  const availableCategories = [...new Set(guides.map(guide => guide.category))].sort();
  const availableCompanies = [...new Set(guides.map(guide => guide.company))].sort();
  const availableTags = [...new Set(guides.flatMap(guide => guide.tags))].sort();

  useEffect(() => {
    const loadGuides = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPayloadGuides();
        setGuides(data);
        setFilteredGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGuides();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim() && !hasActiveFilters(activeFilters)) {
      setFilteredGuides(guides);
      return;
    }
    
    setIsLoading(true);
    try {
      let results = guides;
      
      if (query.trim()) {
        results = await searchPayloadGuides(query);
      }
      
      if (hasActiveFilters(activeFilters)) {
        results = await filterResults(results, activeFilters);
      }
      
      setFilteredGuides(results);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (options: FilterOptions) => {
    setActiveFilters(options);
    
    if (!hasActiveFilters(options) && !searchQuery.trim()) {
      setFilteredGuides(guides);
      return;
    }
    
    setIsLoading(true);
    try {
      let results = guides;
      
      if (searchQuery.trim()) {
        results = await searchPayloadGuides(searchQuery);
      }
      
      if (hasActiveFilters(options)) {
        results = await filterResults(results, options);
      }
      
      setFilteredGuides(results);
    } catch (error) {
      console.error('Error during filtering:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveFilters = (options: FilterOptions): boolean => {
    return (
      !!options.categories?.length ||
      !!options.companies?.length ||
      !!options.tags?.length
    );
  };

  const filterResults = async (results: PayloadGuide[], options: FilterOptions): Promise<PayloadGuide[]> => {
    const filteredResults = await filterPayloadGuides(options);
    
    // Find the intersection of search results and filter results
    return results.filter(guide => 
      filteredResults.some(filteredGuide => filteredGuide.id === guide.id)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container-custom">
          <SlideUp>
            <div className="flex items-center gap-2 text-sm mb-2">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <MoveRight className="h-3 w-3 text-muted-foreground" />
              <span>Guides</span>
            </div>
          </SlideUp>
          
          <SlideUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Browse Payload Guides</h1>
          </SlideUp>
          
          <SlideUp delay={0.2}>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              Discover comprehensive payload user guides from leading space companies.
              Search, filter, and access the documentation you need for your mission.
            </p>
          </SlideUp>
          
          <SlideUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-auto sm:flex-1 max-w-2xl">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search by company, vehicle, or keyword..."
                />
              </div>
              
              <FilterPanel 
                onFilter={handleFilter}
                availableCategories={availableCategories}
                availableCompanies={availableCompanies}
                availableTags={availableTags}
              />
            </div>
          </SlideUp>
        </div>
      </section>
      
      {/* Guides Grid Section */}
      <section className="py-12 flex-grow">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card h-[440px] animate-pulse" />
              ))}
            </div>
          ) : filteredGuides.length > 0 ? (
            <>
              <SlideUp delay={0.4} className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </SlideUp>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide, index) => (
                  <PayloadCard key={guide.id} guide={guide} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No guides found</h3>
              <p className="text-muted-foreground mb-6">
                No guides match your current search and filter criteria.
                Try adjusting your filters or search for something else.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilters({ categories: [], companies: [], tags: [] });
                  setFilteredGuides(guides);
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Guides;
