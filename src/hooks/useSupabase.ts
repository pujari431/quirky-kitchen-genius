import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

// Initialize Supabase client
// Add default values for development to prevent crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create the client only if we have the required configuration
const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends SignInCredentials {
  name?: string;
}

export const useSupabase = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check for user session on mount
  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase?.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          queryClient.invalidateQueries({ queryKey: ['ingredients'] });
          queryClient.invalidateQueries({ queryKey: ['recipes'] });
        }
      }
    ) || { data: { subscription: null } };

    checkUser();

    // Clean up subscription when unmounting
    return () => {
      subscription?.unsubscribe();
    };
  }, [queryClient]);

  // Show warning if Supabase is not configured
  if (!isSupabaseConfigured) {
    console.warn('Supabase URL and/or Anonymous Key not configured. Please add them to your environment variables.');
  }

  // Get the current user
  const getCurrentUser = async () => {
    if (!supabase) {
      toast.error('Supabase is not configured properly');
      throw new Error('Supabase is not configured');
    }
    
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user;
  };

  // Sign in with email and password
  const useSignIn = () => {
    return useMutation({
      mutationFn: async ({ email, password }: SignInCredentials) => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Signed in successfully');
      },
      onError: (error: any) => {
        toast.error(`Sign in failed: ${error.message}`);
      }
    });
  };

  // Sign up with email and password
  const useSignUp = () => {
    return useMutation({
      mutationFn: async ({ email, password, name }: SignUpCredentials) => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        });
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Account created! Please check your email to confirm your account.');
      },
      onError: (error: any) => {
        toast.error(`Sign up failed: ${error.message}`);
      }
    });
  };

  // Sign out the user
  const signOut = async () => {
    if (!supabase) {
      toast.error('Supabase is not configured properly');
      throw new Error('Supabase is not configured');
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success('Signed out successfully');
  };

  // Fetch user's ingredients
  const useIngredients = () => {
    return useQuery({
      queryKey: ['ingredients'],
      queryFn: async () => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
        const { data: ingredients, error } = await supabase
          .from('ingredients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return ingredients as Ingredient[];
      },
      // Only enable if Supabase is configured
      enabled: !!supabase
    });
  };

  // Add ingredients
  const useAddIngredients = () => {
    return useMutation({
      mutationFn: async (ingredients: string[]) => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
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
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          // Return mock recipes instead for development
          return mockRecipes;
        }
        
        try {
          // Call your Supabase Edge Function to generate recipes
          const { data, error } = await supabase.functions.invoke('generate-recipes', {
            body: { ingredients }
          });

          if (error) throw error;
          return data as Recipe[];
        } catch (error) {
          console.error('Error generating recipes:', error);
          toast.error('Failed to generate recipes, using mock data instead');
          // Return mock recipes as fallback
          return mockRecipes;
        }
      }
    });
  };

  // Fetch user's saved recipes
  const useRecipes = () => {
    return useQuery({
      queryKey: ['recipes'],
      queryFn: async () => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
        const { data: recipes, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return recipes as Recipe[];
      },
      // Only enable if Supabase is configured
      enabled: !!supabase
    });
  };

  // Save a recipe
  const useSaveRecipe = () => {
    return useMutation({
      mutationFn: async (recipe: Omit<Recipe, 'id' | 'user_id' | 'created_at'>) => {
        if (!supabase) {
          toast.error('Supabase is not configured properly');
          throw new Error('Supabase is not configured');
        }
        
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

  // Mock recipes for development when Supabase is not configured
  const mockRecipes = [
    {
      id: 1,
      title: "Spicy Peanut Butter Ramen",
      description: "A unique fusion of creamy peanut butter with instant ramen, elevated with whatever vegetables you have on hand.",
      time: "15 min",
      difficulty: "Easy",
      ingredients: ["Instant ramen", "Peanut butter", "Hot sauce", "Vegetables"],
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user_id: "mock-user-id",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Apple-Cereal Fritters",
      description: "Transform breakfast cereals and apples into delicious fritters with a sweet and crunchy texture.",
      time: "25 min",
      difficulty: "Medium",
      ingredients: ["Apples", "Breakfast cereal", "Eggs", "Flour", "Cinnamon"],
      image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user_id: "mock-user-id",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Savory Oatmeal Bowl",
      description: "A savory twist on traditional oatmeal, incorporating cheese, herbs, and whatever protein you have available.",
      time: "10 min",
      difficulty: "Easy",
      ingredients: ["Oats", "Cheese", "Herbs", "Protein (eggs/chicken)"],
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user_id: "mock-user-id",
      created_at: new Date().toISOString()
    }
  ];

  return {
    supabase,
    isSupabaseConfigured,
    getCurrentUser,
    user,
    loading,
    signOut,
    useSignIn,
    useSignUp,
    useIngredients,
    useAddIngredients,
    useGenerateRecipes,
    useRecipes,
    useSaveRecipe,
    mockRecipes
  };
};
