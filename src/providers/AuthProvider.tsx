'use client'

import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { api } from '@/api'
import {
  cookieTokenAuthDelete,
  cookieTokenAuthSave,
} from '@/app/cookies/cookiesAuthToken'

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
      const { data } = await api.post(`/authenticate`, { email, password })

      console.log(data)
      if (data.tokenAuth) {
        cookieTokenAuthSave(data.tokenAuth)
        localStorage.setItem('authToken', data.tokenAuth)
        setTimeout(() => {
          router.push('/home-page')
        }, 300)
      }
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
        router.push('/sign-in')
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
    cookieTokenAuthDelete()
    localStorage.removeItem('authToken')

    router.push('/sign-in')
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      router.push('/sign-in')
    }
  }, [router])

  const value = {
    signIn,
    signOut,
    registerUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
