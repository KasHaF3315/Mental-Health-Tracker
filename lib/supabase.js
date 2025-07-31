import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signInWithEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : 'https://mental-health-tracker.vercel.app'}/dashboard`,
      },
    })
    return { data, error }
  } catch (err) {
    console.error('Sign in error:', err)
    return { data: null, error: err }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err) {
    console.error('Sign out error:', err)
    return { error: err }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (err) {
    console.error('Get user error:', err)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (err) {
    console.error('Get session error:', err)
    return null
  }
}

// Database helpers (using RLS - Row Level Security)
export const saveMoodEntry = async (moodData) => {
  try {
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
  } catch (err) {
    console.error('Save mood error:', err)
    return { data: null, error: err }
  }
}

export const getMoodHistory = async () => {
  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('date', { ascending: false })
    return { data, error }
  } catch (err) {
    console.error('Get mood history error:', err)
    return { data: [], error: err }
  }
}

export const saveRecipeInteraction = async (recipeData) => {
  try {
    const { data, error } = await supabase
      .from('recipe_interactions')
      .insert({
        recipe_id: recipeData.id,
        mood_context: recipeData.moodContext,
        interaction_type: recipeData.type, // 'generated', 'saved', 'rated'
        created_at: new Date().toISOString()
      })
    return { data, error }
  } catch (err) {
    console.error('Save recipe interaction error:', err)
    return { data: null, error: err }
  }
}

// n8n workflow helpers
export const triggerN8nWorkflow = async (workflowData) => {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      console.warn('N8N_WEBHOOK_URL not configured')
      return { error: 'N8N webhook not configured' }
    }

    const response = await fetch(webhookUrl, {
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
