import { ReactNode } from 'react'
import {
  User as AuthUser,
  Session as AuthSession,
  ApiError,
} from '@supabase/supabase-js'

export interface AuthContextProvider {
  authUser?: AuthUser | null
  session: AuthSession | null
  isLoading: boolean
  sendMagicLinkEmail?: (props: SignUpProps) => Promise<SignUpResponse>
  signUp: (props: SignUpProps) => Promise<SignUpResponse>
  signIn: (props: SignUpProps) => Promise<SignInResponse>
  resetPassword?: (
    props: SignUpProps
  ) => Promise<{ data: unknown; error: Error | null }>
  signOut?: () => Promise<SignOutResponse>
  refreshToken?: () => Promise<void>
}

export interface SignUpProps {
  email?: string
  password?: string
  options?: {
    redirectTo?: string
  }
}

export interface SignUpResponse {
  user?: AuthUser | null
  session?: AuthSession | null
  error?: ApiError | null
}

export interface SignInResponse {
  session?: AuthSession | null
  user?: AuthUser | null
  url?: string | null
  error?: ApiError | null
}

interface SignOutResponse {
  error: ApiError | null
}

export interface AuthProviderProps {
  children: ReactNode
}

export interface UserCredentials {
  email?: string
  password?: string
}

export type AuthChangeEvent =
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'PASSWORD_RECOVERY'
  | 'TOKEN_REFRESHED'
