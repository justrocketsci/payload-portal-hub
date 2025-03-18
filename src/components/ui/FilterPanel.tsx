
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/lib/types';

interface FilterPanelProps {
  onFilter: (filters: FilterOptions) => void;
  availableCategories: string[];
  availableCompanies: string[];
  availableTags: string[];
  className?: string;
}

const FilterPanel = ({
  onFilter,
  availableCategories,
  availableCompanies,
  availableTags,
  className = '',
}: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(true);
  const [showCompanies, setShowCompanies] = useState(true);
  const [showTags, setShowTags] = useState(true);

  const totalFiltersApplied = 
    selectedCategories.length + 
    selectedCompanies.length + 
    selectedTags.length;

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleCompany = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleApplyFilters = () => {
    onFilter({
      categories: selectedCategories,
      companies: selectedCompanies,
      tags: selectedTags
    });
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedTags([]);
    
    onFilter({
      categories: [],
      companies: [],
      tags: []
    });
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2 rounded-full"
      >
        <Filter className="h-4 w-4" />
        <span>
          {totalFiltersApplied > 0 
            ? `Filters (${totalFiltersApplied})` 
            : 'Filters'}
        </span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 top-full right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filter Results</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto py-2">
                {/* Categories Filter */}
                <div className="border-b border-border pb-3">
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="w-full flex items-center justify-between py-1"
                  >
                    <h4 className="font-medium text-sm">Categories</h4>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showCategories ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {showCategories && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {availableCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleToggleCategory(category)}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm hover:bg-secondary/60 transition-colors"
                          >
                            <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                              selectedCategories.includes(category) 
                                ? 'bg-accent border-accent text-white' 
                                : 'border-input'
                            }`}>
                              {selectedCategories.includes(category) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>{category}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Companies Filter */}
                <div className="border-b border-border pb-3">
                  <button
                    onClick={() => setShowCompanies(!showCompanies)}
                    className="w-full flex items-center justify-between py-1"
                  >
                    <h4 className="font-medium text-sm">Companies</h4>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showCompanies ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {showCompanies && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {availableCompanies.map((company) => (
                          <button
                            key={company}
                            onClick={() => handleToggleCompany(company)}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm hover:bg-secondary/60 transition-colors"
                          >
                            <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                              selectedCompanies.includes(company) 
                                ? 'bg-accent border-accent text-white' 
                                : 'border-input'
                            }`}>
                              {selectedCompanies.includes(company) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>{company}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tags Filter */}
                <div>
                  <button
                    onClick={() => setShowTags(!showTags)}
                    className="w-full flex items-center justify-between py-1"
                  >
                    <h4 className="font-medium text-sm">Tags</h4>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showTags ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {showTags && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2">
                          {availableTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleToggleTag(tag)}
                              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                selectedTags.includes(tag)
                                  ? 'bg-accent text-white border-accent'
                                  : 'border-input hover:bg-secondary/60'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  disabled={totalFiltersApplied === 0}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
