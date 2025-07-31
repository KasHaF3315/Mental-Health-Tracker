import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signInWithEmail = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Database helpers (using RLS - Row Level Security)
export const saveMoodEntry = async (moodData) => {
  const { data, error } = await supabase
    .from('mood_entries')
    .upsert({
      date: moodData.date,
      mood: moodData.mood,
      mood_label: moodData.moodLabel,
      mood_value: moodData.moodValue,
      note: moodData.note,
      updated_at: new Date().toISOString()
    })
  return { data, error }
}

export const getMoodHistory = async () => {
  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .order('date', { ascending: false })
  return { data, error }
}

export const saveRecipeInteraction = async (recipeData) => {
  const { data, error } = await supabase
    .from('recipe_interactions')
    .insert({
      recipe_id: recipeData.id,
      mood_context: recipeData.moodContext,
      interaction_type: recipeData.type, // 'generated', 'saved', 'rated'
      created_at: new Date().toISOString()
    })
  return { data, error }
}

// n8n workflow helpers
export const triggerN8nWorkflow = async (workflowData) => {
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workflowData)
    })
    return await response.json()
  } catch (error) {
    console.error('n8n workflow error:', error)
    return { error: error.message }
  }
}
