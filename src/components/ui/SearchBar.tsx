
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Rocket, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { searchPayloadGuides } from '@/lib/api';
import { PayloadGuide } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ className = '', placeholder = 'Search payload guides...', onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PayloadGuide[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchPayloadGuides(searchQuery);
      setResults(searchResults.slice(0, 5)); // Limit to 5 results for dropdown
      
      if (onSearch) {
        onSearch(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleSelectResult = (id: string) => {
    navigate(`/guides/${id}`);
    setIsSearchActive(false);
    setResults([]);
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Escape key to close results
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div 
      ref={searchRef}
      className={`relative ${className}`}
    >
      <div 
        className={`flex items-center bg-background rounded-full border border-input pl-4 pr-2 transition-all ${
          isSearchActive ? 'shadow-md border-accent/50 ring-1 ring-accent/20' : ''
        }`}
      >
        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsSearchActive(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none py-2 px-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
        />
        
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                type="button"
                variant="ghost" 
                size="icon"
                onClick={handleClear}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isSearchActive && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-card shadow-lg rounded-lg border border-border overflow-hidden z-10"
          >
            <div className="max-h-72 overflow-y-auto py-2">
              {results.map((result) => (
                <motion.button
                  key={result.id}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors"
                  onClick={() => handleSelectResult(result.id)}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {result.category === 'Launch Vehicles' ? (
                      <Rocket className="h-5 w-5 text-accent" />
                    ) : (
                      <FileText className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{result.title}</p>
                    <p className="text-sm text-muted-foreground">{result.company}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
