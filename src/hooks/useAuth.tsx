import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export function UseAuth() {
  const context = useContext(AuthContext)
  return context
}
