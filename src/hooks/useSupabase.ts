
import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Ingredient {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  time: string;
  difficulty: string;
  image: string;
  user_id: string;
  created_at: string;
}

export const useSupabase = () => {
  const queryClient = useQueryClient();

  // Get the current user
  const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user;
  };

  // Sign out the user
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Fetch user's ingredients
  const useIngredients = () => {
    return useQuery({
      queryKey: ['ingredients'],
      queryFn: async () => {
        const { data: ingredients, error } = await supabase
          .from('ingredients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return ingredients as Ingredient[];
      }
    });
  };

  // Add ingredients
  const useAddIngredients = () => {
    return useMutation({
      mutationFn: async (ingredients: string[]) => {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const ingredientsToInsert = ingredients.map(name => ({
          name,
          user_id: user.id
        }));

        const { data, error } = await supabase
          .from('ingredients')
          .insert(ingredientsToInsert)
          .select();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      }
    });
  };

  // Generate recipes based on ingredients
  const useGenerateRecipes = () => {
    return useMutation({
      mutationFn: async (ingredients: string[]) => {
        // Call your Supabase Edge Function to generate recipes
        const { data, error } = await supabase.functions.invoke('generate-recipes', {
          body: { ingredients }
        });

        if (error) throw error;
        return data as Recipe[];
      }
    });
  };

  // Fetch user's saved recipes
  const useRecipes = () => {
    return useQuery({
      queryKey: ['recipes'],
      queryFn: async () => {
        const { data: recipes, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return recipes as Recipe[];
      }
    });
  };

  // Save a recipe
  const useSaveRecipe = () => {
    return useMutation({
      mutationFn: async (recipe: Omit<Recipe, 'id' | 'user_id' | 'created_at'>) => {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('recipes')
          .insert({ ...recipe, user_id: user.id })
          .select();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['recipes'] });
      }
    });
  };

  return {
    supabase,
    getCurrentUser,
    signOut,
    useIngredients,
    useAddIngredients,
    useGenerateRecipes,
    useRecipes,
    useSaveRecipe
  };
};
