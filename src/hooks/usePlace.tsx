import { PlaceContext } from '@/context/PlaceContext'
import { useContext } from 'react'

export function UsePlace() {
  const context = useContext(PlaceContext)
  return context
}
