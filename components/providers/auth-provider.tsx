'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User, AuthError } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>
  signOut: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Initialize auth state once
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setAuthInitialized(true)
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authInitialized) {
      initializeAuth()
    }
  }, [supabase.auth, authInitialized])

  // Set up auth state change listener
  useEffect(() => {
    if (!authInitialized) return

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Debounced navigation
  const debouncedNavigate = useCallback((path: string) => {
    const timeoutId = setTimeout(() => {
      router.refresh()
      router.push(path)
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [router])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      if (data.user) {
        debouncedNavigate('/dashboard')
      }
      
      return { user: data?.user ?? null, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { user: null, error: error as AuthError }
    }
  }, [supabase.auth, debouncedNavigate])

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      debouncedNavigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }, [supabase.auth, debouncedNavigate])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 