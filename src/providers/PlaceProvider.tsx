'use client'

import { PlaceContext } from '@/context/PlaceContext'
import { ReactNode } from 'react'

type PlaceProviderProps = {
  children: ReactNode
}

export function PlaceProvider({ children }: PlaceProviderProps) {
  const value = {}
  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
}
