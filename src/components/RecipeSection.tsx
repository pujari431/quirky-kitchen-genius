import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Bookmark, BookmarkCheck, ChefHat, InfoIcon, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSupabase } from '@/hooks/useSupabase';
import { toast } from 'sonner';

// Keep the mock recipes as fallback
const mockRecipes = [
  {
    id: 1,
    title: "Spicy Peanut Butter Ramen",
    description: "A unique fusion of creamy peanut butter with instant ramen, elevated with whatever vegetables you have on hand.",
    time: "15 min",
    difficulty: "Easy",
    ingredients: ["Instant ramen", "Peanut butter", "Hot sauce", "Vegetables"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Apple-Cereal Fritters",
    description: "Transform breakfast cereals and apples into delicious fritters with a sweet and crunchy texture.",
    time: "25 min",
    difficulty: "Medium",
    ingredients: ["Apples", "Breakfast cereal", "Eggs", "Flour", "Cinnamon"],
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Savory Oatmeal Bowl",
    description: "A savory twist on traditional oatmeal, incorporating cheese, herbs, and whatever protein you have available.",
    time: "10 min",
    difficulty: "Easy",
    ingredients: ["Oats", "Cheese", "Herbs", "Protein (eggs/chicken)"],
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const RecipeCard = ({ recipe, onSave }) => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(!saved);
    onSave(recipe, !saved);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <Badge className="bg-white/80 text-chef-primary hover:bg-white/90">{recipe.difficulty}</Badge>
            <Badge className="bg-white/80 text-chef-primary hover:bg-white/90 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.time}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-chef-primary rounded-full h-8 w-8"
            onClick={handleSave}
          >
            {saved ? <BookmarkCheck className="h-4 w-4 text-chef-highlight" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-chef-primary">{recipe.title}</h3>
          <p className="text-zinc-600 text-sm mb-4">{recipe.description}</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-chef-accent" />
              <span className="text-sm font-medium text-chef-primary">Ingredients</span>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <InfoIcon className="h-3 w-3 text-zinc-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Ingredients found in your kitchen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-chef-muted border-none text-zinc-700"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full mt-5 bg-chef-primary hover:bg-chef-primary/90 text-white"
            onClick={() => {
              toast.success("Recipe view feature coming soon!");
            }}
          >
            View Recipe
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecipeSection = () => {
  // Use our Supabase hook
  const { useRecipes, useSaveRecipe } = useSupabase();
  const { data: recipes, isLoading, error } = useRecipes();
  const saveRecipeMutation = useSaveRecipe();

  const handleSaveRecipe = async (recipe, isSaving) => {
    if (isSaving) {
      try {
        const { title, description, ingredients, time, difficulty, image } = recipe;
        await saveRecipeMutation.mutateAsync({
          title,
          description,
          ingredients,
          time,
          difficulty,
          image
        });
        
        toast.success("Recipe saved successfully!");
      } catch (error) {
        console.error('Error saving recipe:', error);
        toast.error("Failed to save recipe");
      }
    } else {
      // Handle unsave logic if needed
      toast.info("Recipe removed from saved list");
    }
  };

  return (
    <section id="recipe-section" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-chef-primary mb-4">Discover Creative Recipes</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Based on your kitchen inventory, we've created unique recipes that you can make right now.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 text-chef-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load recipes. Using mock data instead.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {mockRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  onSave={handleSaveRecipe}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(recipes && recipes.length > 0 ? recipes : mockRecipes).map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                onSave={handleSaveRecipe}
              />
            ))}
          </div>
        )}
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            className="bg-transparent hover:bg-chef-muted text-chef-primary border border-chef-primary/20 px-8"
            onClick={() => {
              toast.info("More recipes feature coming soon!");
            }}
          >
            Show More Recipes
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeSection;
