
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1'

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Create an OpenAI client
const openaiApiKey = Deno.env.get('OPENAI_API_KEY') as string
const configuration = new Configuration({ apiKey: openaiApiKey })
const openai = new OpenAIApi(configuration)

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { ingredients } = await req.json()

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing ingredients list' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate recipes using OpenAI
    const prompt = `
    You are a creative chef. Generate 3 unique and creative recipes based on these ingredients:
    ${ingredients.join(', ')}
    
    Focus on unusual combinations and creative cooking methods. The recipes should be feasible with only these ingredients plus basic pantry staples (salt, pepper, oil).
    
    For each recipe, provide:
    1. Title
    2. Short description
    3. List of ingredients
    4. Approximate cooking time
    5. Difficulty level (Easy, Medium, Hard)
    
    Format each recipe as a JSON object with these fields:
    {
      "title": "",
      "description": "",
      "ingredients": [],
      "time": "",
      "difficulty": ""
    }
    
    Return an array of 3 such objects, with no additional text.
    `

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a creative recipe generator.' },
        { role: 'user', content: prompt }
      ],
      temperature: 1.0,
      max_tokens: 1000,
    })

    // Parse AI response to get recipes
    let recipes = []
    try {
      const content = response.data.choices[0].message.content.trim()
      recipes = JSON.parse(content)
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e)
      return new Response(
        JSON.stringify({ error: 'Failed to parse recipe data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Add random images to the recipes
    const recipeImages = [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
      'https://images.unsplash.com/photo-1609951651556-5334e2706168',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      'https://images.unsplash.com/photo-1547592180-85f173990554',
    ]

    const recipesWithImages = recipes.map((recipe, index) => ({
      ...recipe,
      image: `${recipeImages[index % recipeImages.length]}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`,
    }))

    return new Response(
      JSON.stringify(recipesWithImages),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate recipes' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
