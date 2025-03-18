
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/guides', label: 'Guides' },
    { path: '/submit', label: 'Submit Guide' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm py-3' : 'py-5 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-medium text-lg">
          <motion.div 
            className="w-10 h-10 flex items-center justify-center bg-accent text-white rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PP
          </motion.div>
          <span className="hidden sm:inline">Payload Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-md transition-all ${
                location.pathname === link.path
                  ? 'text-accent font-medium'
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden glass absolute top-full left-0 right-0 border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-3 flex flex-col">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`block px-4 py-3 rounded-md transition-all ${
                    location.pathname === link.path
                      ? 'text-accent font-medium bg-secondary/50'
                      : 'text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
