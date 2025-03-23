
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Lock, ArrowRight, ImageIcon, ChefHat } from 'lucide-react';
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
          <h2 className="text-3xl md:text-4xl font-bold text-chef-primary mb-4">Supabase Setup Guide</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Follow these steps to configure your Supabase project for ingredient detection and recipe generation.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md border border-zinc-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-chef-primary">1. Database Setup</h3>
            <p className="text-zinc-600 mb-4">Create the following tables in your Supabase database:</p>
            
            <div className="space-y-4">
              <div className="bg-chef-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-chef-accent" />
                  <p className="font-medium text-chef-primary">ingredients</p>
                </div>
                <div className="text-sm text-zinc-600 space-y-1">
                  <p>- id: int8 (primary key)</p>
                  <p>- name: text</p>
                  <p>- user_id: uuid (references auth.users)</p>
                  <p>- created_at: timestamptz</p>
                </div>
              </div>
              
              <div className="bg-chef-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-chef-accent" />
                  <p className="font-medium text-chef-primary">recipes</p>
                </div>
                <div className="text-sm text-zinc-600 space-y-1">
                  <p>- id: int8 (primary key)</p>
                  <p>- title: text</p>
                  <p>- description: text</p>
                  <p>- ingredients: text[]</p>
                  <p>- time: text</p>
                  <p>- difficulty: text</p>
                  <p>- image: text</p>
                  <p>- user_id: uuid (references auth.users)</p>
                  <p>- created_at: timestamptz</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md border border-zinc-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-chef-primary">2. Edge Functions</h3>
            <p className="text-zinc-600 mb-4">Deploy the following Edge Functions:</p>
            
            <div className="space-y-4">
              <div className="bg-chef-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-5 w-5 text-chef-accent" />
                  <p className="font-medium text-chef-primary">detect-ingredients</p>
                </div>
                <p className="text-sm text-zinc-600">
                  Accepts an image and uses computer vision AI to detect ingredients
                </p>
              </div>
              
              <div className="bg-chef-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="h-5 w-5 text-chef-accent" />
                  <p className="font-medium text-chef-primary">generate-recipes</p>
                </div>
                <p className="text-sm text-zinc-600">
                  Accepts an array of ingredients and uses AI to generate creative recipes
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-4 text-chef-primary">3. API Keys</h3>
            <p className="text-zinc-600 mb-4">Set these secret environment variables:</p>
            
            <div className="bg-chef-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-chef-accent" />
                <p className="font-medium text-chef-primary">Secrets</p>
              </div>
              <div className="text-sm text-zinc-600 space-y-1">
                <p>- OPENAI_API_KEY: For recipe generation</p>
                <p>- VISION_API_KEY: For ingredient detection (optional)</p>
              </div>
            </div>
          </motion.div>
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
              window.open('https://supabase.com/docs', '_blank');
            }}
          >
            View Supabase Documentation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-zinc-500 text-sm">
            You'll need to set up user authentication to track ingredient inventories and saved recipes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
