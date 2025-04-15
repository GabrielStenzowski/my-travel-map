import {
  AtributePlaceToMeProps,
  CreatePlaceProps,
  IVisitedThisPlaceProps,
  MyNonVisitedPlaceProps,
  SearchPlaceProps,
} from '@/providers/PlaceProvider'
import { createContext } from 'react'

export type PlaceContextProps = {
  createPlace: (data: CreatePlaceProps) => void
  searchedPlace: SearchPlaceProps[]
  atributePlaceToMe: (data: AtributePlaceToMeProps) => void
  myNonVisitedPlace: MyNonVisitedPlaceProps[]
  iVisitedThisPlace: (data: IVisitedThisPlaceProps) => void
}

export const PlaceContext = createContext({} as PlaceContextProps)
