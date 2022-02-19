import { createContext, useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Session, User as AuthUser } from '@supabase/supabase-js'
import { supabase } from '../../libs/supabase/client'
import {
  AuthChangeEvent,
  AuthContextProvider,
  AuthProviderProps,
  SignUpProps,
  SignInResponse,
  SignUpResponse,
} from '../../types'

const AuthContext = createContext<AuthContextProvider>({
  isLoading: true,
  session: null,
  signIn: async (): Promise<SignInResponse> => {
    return {}
  },
  signUp: async (): Promise<SignUpResponse> => {
    return {}
  },
})

const useProvideAuth = () => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  )
  const [authUser, setAuthUser] = useState<AuthUser | undefined | null>(
    supabase.auth.user() || undefined
  )

  const signUp = ({ email, password, options }: SignUpProps) => {
    return supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        redirectTo: options?.redirectTo,
      }
    )
  }

  /**
   * Signs in using an email and password. and calls signIn when successful.
   * sets loading to true.
   */
  const signIn = ({ email, password, options }: SignUpProps) => {
    return supabase.auth.signIn(
      {
        email,
        password,
      },
      {
        redirectTo: options?.redirectTo,
      }
    )
  }

  /**
   * Calls firebase signOut and with clear callback to reset state.
   */
  const signOut = async () => {
    return supabase.auth.signOut()
  }

  useEffect(() => {
    const session = supabase.auth.session()
    if (session) {
      setSession(session)
      setAuthUser(session?.user ?? null)
    }

    const { data: authListener, error } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        if (event === 'TOKEN_REFRESHED') {
          queryClient.resetQueries()
        }

        setSession(session)
        setAuthUser(session?.user ?? null)
      }
    )

    setIsLoading(false)

    if (error) {
      throw error
    }

    return () => {
      authListener?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // returns state values and callbacks for signIn and signOut.
  return {
    authUser,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  }
}

export function AuthProvider(props: AuthProviderProps): JSX.Element {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth} {...props} />
}

export const useAuth = (): AuthContextProvider => useContext(AuthContext)
