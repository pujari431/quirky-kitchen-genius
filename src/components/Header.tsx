
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useSupabase();
  const navigate = useNavigate();
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center"
        >
          <Link to="/" className="text-xl font-bold text-chef-primary flex items-center gap-2">
            <span className="text-chef-accent text-2xl">IC</span>
            Invisible Chef
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {['How It Works', 'Features', 'Recipes'].map((item) => (
            <a 
              key={item}
              href="#"
              className="text-zinc-600 hover:text-chef-primary transition-colors"
            >
              {item}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-chef-primary" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <Button 
                onClick={handleSignOut}
                className="bg-chef-primary hover:bg-chef-primary/90 text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/signin')}
              className="bg-chef-primary hover:bg-chef-primary/90 text-white"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </motion.nav>
        
        {/* Mobile Menu Button */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-chef-primary"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-10">
                <a href="#" className="text-xl font-bold text-chef-primary flex items-center gap-2">
                  <span className="text-chef-accent text-2xl">IC</span>
                  Invisible Chef
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-chef-primary"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-6">
                {['How It Works', 'Features', 'Recipes'].map((item, i) => (
                  <motion.a 
                    key={item}
                    href="#"
                    className="text-xl text-chef-primary py-2 border-b border-zinc-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                  >
                    {item}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 py-2">
                        <User className="h-4 w-4 text-chef-primary" />
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                      <Button 
                        onClick={handleSignOut}
                        className="w-full bg-chef-primary hover:bg-chef-primary/90 text-white"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        navigate('/signin');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-chef-primary hover:bg-chef-primary/90 text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
