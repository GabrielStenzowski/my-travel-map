import { CategoryProps } from '@/providers/CategoryProvider'
import { createContext } from 'react'

export type CategoryContextProps = {
  category: CategoryProps[]
}

export const CategoryContext = createContext({} as CategoryContextProps)
