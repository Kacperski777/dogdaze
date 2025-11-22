import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const user = ref(null)
const loading = ref(true)

// Initialize auth state
let initialized = false

const initAuth = async () => {
  if (initialized) return
  
  initialized = true
  
  // Get initial session
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    user.value = session?.user ?? null
  } catch (error) {
    console.error('Error getting session:', error.message)
  } finally {
    loading.value = false
  }

  // Listen to auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    loading.value = false
  })
}

export function useAuth() {
  const router = useRouter()

  // Initialize on first use
  if (!initialized) {
    initAuth()
  }

  // Get current session
  const getSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      user.value = session?.user ?? null
      return session
    } catch (error) {
      console.error('Error getting session:', error.message)
      return null
    } finally {
      loading.value = false
    }
  }

  // Sign up
  const signUp = async (email, password, userData = {}) => {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData // Additional user metadata
        }
      })
      if (error) throw error
      user.value = data.user
      return { user: data.user, error: null }
    } catch (error) {
      console.error('Error signing up:', error.message)
      return { user: null, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Sign in
  const signIn = async (email, password) => {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      user.value = data.user
      return { user: data.user, error: null }
    } catch (error) {
      console.error('Error signing in:', error.message)
      return { user: null, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      user.value = null
      router.push('/auth/login')
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error.message)
      return { error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Get user profile from profiles table
  const getUserProfile = async () => {
    try {
      if (!user.value) return null
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error.message)
      return null
    }
  }

  // Update user profile (upsert - creates if doesn't exist, updates if exists)
  const updateUserProfile = async (updates) => {
    try {
      if (!user.value) throw new Error('No user logged in')
      
      // First try to get existing profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.value.id)
        .single()
      
      let data, error
      
      if (existingProfile) {
        // Update existing profile
        const result = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.value.id)
          .select()
          .single()
        data = result.data
        error = result.error
      } else {
        // Create new profile
        const result = await supabase
          .from('profiles')
          .insert({ id: user.value.id, ...updates })
          .select()
          .single()
        data = result.data
        error = result.error
      }
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating profile:', error.message)
      return { data: null, error: error.message }
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    getSession,
    getUserProfile,
    updateUserProfile
  }
}

