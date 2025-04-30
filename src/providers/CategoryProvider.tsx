'use client'

import { api } from '@/api'
import { CategoryContext } from '@/context/CategoryContext'
import { ReactNode, useEffect, useState } from 'react'

type CategoryProviderProps = {
  children: ReactNode
}

export type CategoryProps = {
  id: string
  category_name: string
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [category, setCategory] = useState<CategoryProps[]>([])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategory(response.data)
    } catch (error) {
      console.error('erro ao buscar categorias', error)
    }
  }

  const fetchCategoryById = async (id: string) => {
    try {
      const response = await api.get(`/category/${id}`)
      return response.data
    } catch (error) {
      console.error('erro ao buscar categorias', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  const value = {
    category,
    fetchCategoryById,
  }
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}
