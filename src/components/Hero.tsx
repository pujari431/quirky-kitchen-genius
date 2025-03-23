
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-chef-muted/50 to-white/95"></div>
      </div>
      
      <motion.div 
        className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span 
          className="inline-block text-sm md:text-base font-medium px-4 py-1.5 rounded-full bg-chef-primary/5 text-chef-primary border border-chef-primary/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          No shopping required
        </motion.span>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-chef-primary hero-text-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Cook with what you <span className="text-chef-accent">already have</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Invisible Chef scans your kitchen inventory and creates unique recipes using only what's available—turning ordinary ingredients into extraordinary meals.
        </motion.p>
        
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-chef-primary hover:bg-chef-primary/90 text-white rounded-full px-8 h-14 text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
          >
            Get Started
            <ArrowRightCircle className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-zinc-500 mb-2">Scroll to explore</span>
          <div className="w-1 h-6 rounded-full bg-zinc-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 w-full bg-zinc-500 h-3 animate-pulse-soft"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
