import { RegisterUserProps, SignInProps } from '@/providers/AuthProvider'
import { createContext } from 'react'

export type AuthContextProps = {
  signIn: (data: SignInProps) => void
  signOut: () => Promise<void>
  registerUser: (data: RegisterUserProps) => void
}

export const AuthContext = createContext({} as AuthContextProps)
