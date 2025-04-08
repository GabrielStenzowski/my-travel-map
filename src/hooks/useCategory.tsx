import { CategoryContext } from '@/context/CategoryContext'
import { useContext } from 'react'

export function UseCategory() {
  const context = useContext(CategoryContext)
  return context
}
