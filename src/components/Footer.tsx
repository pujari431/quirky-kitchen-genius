
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-chef-primary text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Invisible Chef</h3>
            <p className="text-zinc-300 mb-6 max-w-md">
              Creating unique recipes from what's already in your kitchen. No shopping required.
            </p>
            <div className="flex items-center space-x-4">
              {['Twitter', 'Instagram', 'Facebook'].map((platform) => (
                <a 
                  key={platform} 
                  href="#" 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
          
          {[
            {
              title: "Features",
              links: ["Ingredient Scanner", "Recipe Generator", "Taste Profile", "Recipe History"]
            },
            {
              title: "About",
              links: ["Our Story", "How It Works", "Privacy Policy", "Terms of Service"]
            }
          ].map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-zinc-700 text-center text-zinc-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Invisible Chef. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
