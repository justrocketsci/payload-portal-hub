
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register'>(defaultView);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${view} form submitted`, formData);
    // In a real app, we would handle authentication here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative glass-card max-w-md w-full overflow-hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full z-10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white mb-4">
                  PP
                </div>
                <h2 className="text-2xl font-medium mb-1">
                  {view === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-muted-foreground">
                  {view === 'login'
                    ? 'Sign in to access your account'
                    : 'Join Payload Portal to submit guides and more'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'register' && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Space Company Inc."
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    {view === 'login' && (
                      <a href="#" className="text-xs text-accent hover:underline">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                {view === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      className="text-accent hover:underline font-medium"
                      onClick={() => setView('register')}
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      className="text-accent hover:underline font-medium"
                      onClick={() => setView('login')}
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
