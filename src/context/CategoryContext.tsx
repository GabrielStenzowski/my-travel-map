import { CategoryProps } from '@/providers/CategoryProvider'
import { createContext } from 'react'

export type CategoryContextProps = {
  category: CategoryProps[]
  fetchCategoryById: (id: string) => Promise<CategoryProps | undefined>
}

export const CategoryContext = createContext({} as CategoryContextProps)
