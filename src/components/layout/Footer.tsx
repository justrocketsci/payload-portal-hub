
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-medium text-lg">
              <div className="w-10 h-10 flex items-center justify-center bg-accent text-white rounded-full">
                PP
              </div>
              <span>Payload Portal</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The premier destination for space companies looking to access and share payload user guides.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-foreground text-sm">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-foreground text-sm">
                  Submit Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex space-x-3">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-white transition-all"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-white transition-all"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:contact@payloadportal.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-white transition-all"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Payload Portal. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed with precision for the space industry
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
