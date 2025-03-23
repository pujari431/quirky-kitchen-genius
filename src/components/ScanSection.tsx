
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Check, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ScanSection = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleScan = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
        startScanProcess();
      }
    };
    reader.readAsDataURL(file);
  };
  
  const startScanProcess = () => {
    setScanning(true);
    
    // Simulate API call to detect ingredients
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      
      // Mock detected ingredients - in a real app, this would come from an API
      const mockIngredients = [
        'Tomatoes',
        'Onions',
        'Garlic',
        'Olive oil',
        'Salt',
        'Pepper',
        'Pasta',
      ];
      
      setDetectedIngredients(mockIngredients);
      
      toast({
        title: "Ingredients Detected!",
        description: `Found ${mockIngredients.length} ingredients in your image.`,
      });
    }, 2500);
  };
  
  const resetScan = () => {
    setScanned(false);
    setImagePreview(null);
    setDetectedIngredients([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
                capture="environment"
              />
              
              {!imagePreview && !scanning && !scanned && (
                <div className="text-zinc-400 flex flex-col items-center">
                  <Camera className="h-10 w-10 mb-2" />
                  <p>Ready to scan</p>
                </div>
              )}
              
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Ingredients" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/30 backdrop-blur-sm">
                  <Loader2 className="h-10 w-10 text-chef-highlight animate-spin mb-2" />
                  <p className="text-white font-medium">Scanning ingredients...</p>
                </div>
              )}
              
              {scanned && detectedIngredients.length > 0 && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-chef-primary/10 to-chef-highlight/10 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center absolute bottom-4 left-4 right-4">
                    <div className="bg-green-100 p-2 rounded-full inline-block mb-2">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-chef-primary font-medium">Found {detectedIngredients.length} ingredients!</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              {!scanned ? (
                <>
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
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-chef-primary">Detected Ingredients</h3>
                  
                  <motion.ul 
                    className="space-y-1 bg-zinc-50 rounded-lg p-4 max-h-60 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {detectedIngredients.map((ingredient, idx) => (
                      <motion.li 
                        key={idx}
                        className="text-zinc-700 flex items-center gap-2 p-1.5 hover:bg-zinc-100 rounded"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <div className="w-2 h-2 bg-chef-accent rounded-full" />
                        {ingredient}
                      </motion.li>
                    ))}
                  </motion.ul>
                </>
              )}
              
              <div className="pt-4">
                {!scanned ? (
                  <Button
                    onClick={handleScan}
                    disabled={scanning}
                    className={`w-full md:w-auto px-6 py-6 h-auto text-white rounded-lg shadow transition-all duration-300 ${
                      scanning ? 'bg-zinc-400' : 'bg-chef-accent hover:bg-chef-accent/90'
                    }`}
                  >
                    {scanning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Scan Ingredients
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button
                      onClick={resetScan}
                      variant="outline"
                      className="px-6 py-5 h-auto"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Scan Again
                    </Button>
                    
                    <Button
                      className="px-6 py-5 h-auto bg-chef-primary hover:bg-chef-primary/90"
                    >
                      Get Recipe Suggestions
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScanSection;
