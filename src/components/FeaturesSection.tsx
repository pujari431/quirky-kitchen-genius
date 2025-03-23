
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, BookOpen, BarChart3, Star } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Camera className="h-8 w-8 text-chef-accent" />,
    title: "Smart Ingredient Recognition",
    description: "Our AI identifies ingredients accurately from photos, so you don't have to input them manually."
  },
  {
    id: 2,
    icon: <BookOpen className="h-8 w-8 text-chef-accent" />,
    title: "Creative Recipe Generation",
    description: "Discover unique dishes you'd never think of, making the most of what's already in your kitchen."
  },
  {
    id: 3,
    icon: <BarChart3 className="h-8 w-8 text-chef-accent" />,
    title: "Personalized Taste Profile",
    description: "The more you use Invisible Chef, the better it understands your preferences and dietary needs."
  },
  {
    id: 4,
    icon: <Star className="h-8 w-8 text-chef-accent" />,
    title: "Zero Waste Cooking",
    description: "Reduce food waste by using what you have instead of buying more ingredients."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-chef-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-chef-primary mb-4">Why Invisible Chef?</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Our app transforms how you approach cooking, making it more creative, efficient, and sustainable.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="bg-chef-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-chef-primary">{feature.title}</h3>
              <p className="text-zinc-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
