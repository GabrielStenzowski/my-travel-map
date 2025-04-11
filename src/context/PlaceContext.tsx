import {
  AtributePlaceToMeProps,
  CreatePlaceProps,
  MyNonVisitedPlaceProps,
  SearchPlaceProps,
} from '@/providers/PlaceProvider'
import { createContext } from 'react'

export type PlaceContextProps = {
  createPlace: (data: CreatePlaceProps) => void
  searchedPlace: SearchPlaceProps[]
  atributePlaceToMe: (data: AtributePlaceToMeProps) => void
  myNonVisitedPlace: MyNonVisitedPlaceProps[]
}

export const PlaceContext = createContext({} as PlaceContextProps)
