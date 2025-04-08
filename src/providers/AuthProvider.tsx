'use client'

import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { api } from '@/api'

type AuthProviderProps = {
  children: ReactNode
}

export type SignInProps = {
  email: string
  password: string
}

export type RegisterUserProps = {
  name: string
  email: string
  password: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.get(`/users?email=${email}`)
      const user = response.data[0]
      if (!user) {
        console.error('Usuário não encontrado.')
        return
      }
      const passwordMatch = await bcrypt.compare(password, user.password_hash)
      if (!passwordMatch) {
        console.error('Senha incorreta.')
        return
      }
      localStorage.setItem('user-name', user.name)
      localStorage.setItem('user-email', user.email)
      router.push('/protected-routes/home-page')
    } catch (error) {
      console.error('Erro ao logar:', error)
    }
  }

  const registerUser = async ({ name, email, password }: RegisterUserProps) => {
    const uuid = uuidv4()
    const hashPassword = await bcrypt.hash(password, 4)
    try {
      const response = await api.post('/users', {
        id: uuid,
        name: name,
        email: email,
        password_hash: hashPassword,
      })
      if (response.status === 201) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Erro ao registrar usuario:', error)
    }
    console.log('dentro do provider', {
      name,
      email,
      password,
      uuid,
      hashPassword,
    })
  }

  async function signOut() {
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-email')
    router.push('/login')
  }

  const value = {
    signIn,
    signOut,
    registerUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
