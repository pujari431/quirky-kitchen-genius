
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import ScanSection from '@/components/ScanSection';
import RecipeSection from '@/components/RecipeSection';
import Footer from '@/components/Footer';
import ConnectSection from '@/components/ConnectSection';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-chef-accent origin-left z-50"
        style={{ scaleX }}
      />
      
      <Header />
      
      <main>
        <Hero />
        <FeaturesSection />
        <ScanSection />
        <RecipeSection />
        <ConnectSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
