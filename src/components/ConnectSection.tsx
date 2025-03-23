
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConnectSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-chef-primary mb-4">Connect Your Backend</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Store ingredients, save favorite recipes, and personalize your experience with a powerful backend.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            {
              icon: <Database className="h-8 w-8 text-chef-accent" />,
              title: "Data Storage",
              description: "Store user preferences, ingredient lists, and favorite recipes in a secure database."
            },
            {
              icon: <Server className="h-8 w-8 text-chef-accent" />,
              title: "API Integration",
              description: "Connect to ingredient recognition APIs and recipe generation services."
            },
            {
              icon: <Lock className="h-8 w-8 text-chef-accent" />,
              title: "User Authentication",
              description: "Secure user accounts with modern authentication methods."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-zinc-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="bg-chef-accent/10 p-3 rounded-full inline-block mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-chef-primary">{item.title}</h3>
              <p className="text-zinc-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            className="bg-chef-primary hover:bg-chef-primary/90 px-6 py-6 h-auto text-white rounded-lg shadow transition-all duration-300"
            onClick={() => {
              // This would typically navigate to a documentation page or signup flow
              window.open('https://docs.lovable.dev/integrations/supabase/', '_blank');
            }}
          >
            Get Started with Supabase
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-zinc-500 text-sm">
            We recommend Supabase for a complete backend solution with authentication, database, and storage.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
