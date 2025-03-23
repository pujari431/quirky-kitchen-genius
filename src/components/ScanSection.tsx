
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScanSection = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 3000);
  };
  
  return (
    <section className="py-20 px-6 bg-chef-muted">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-chef-primary mb-4">Scan Your Ingredients</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Point your camera at your pantry, refrigerator, or ingredients and we'll identify what you have available.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 aspect-video bg-zinc-100 rounded-lg overflow-hidden relative flex items-center justify-center">
              {!scanning && !scanned && (
                <div className="text-zinc-400 flex flex-col items-center">
                  <Camera className="h-10 w-10 mb-2" />
                  <p>Ready to scan</p>
                </div>
              )}
              
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <Loader2 className="h-10 w-10 text-chef-highlight animate-spin mb-2" />
                  <p className="text-chef-primary font-medium">Scanning ingredients...</p>
                </div>
              )}
              
              {scanned && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-chef-primary/10 to-chef-highlight/10 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="bg-green-100 p-2 rounded-full inline-block mb-2">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-chef-primary font-medium">Scan complete!</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-xl font-semibold text-chef-primary">How It Works</h3>
              
              <ul className="space-y-3">
                {[
                  { id: 1, text: "Point your camera at your ingredients" },
                  { id: 2, text: "Our AI recognizes what's available" },
                  { id: 3, text: "Get creative recipe suggestions instantly" }
                ].map((step) => (
                  <motion.li 
                    key={step.id}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + step.id * 0.1, duration: 0.4 }}
                  >
                    <div className="w-6 h-6 bg-chef-accent/10 text-chef-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.id}
                    </div>
                    <span className="text-zinc-700">{step.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button
                  onClick={handleScan}
                  disabled={scanning}
                  className={`w-full md:w-auto px-6 py-6 h-auto text-white rounded-lg shadow transition-all duration-300 ${
                    scanning ? 'bg-zinc-400' : scanned ? 'bg-green-600 hover:bg-green-700' : 'bg-chef-accent hover:bg-chef-accent/90'
                  }`}
                >
                  {scanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scanning...
                    </>
                  ) : scanned ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Scan Complete
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Scan Ingredients
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScanSection;
