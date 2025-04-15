import {
  AtributePlaceToMeProps,
  CreatePlaceProps,
  IVisitedThisPlaceProps,
  MyNonVisitedPlaceProps,
  MyVisitedPlacesProps,
  SearchPlaceProps,
} from '@/providers/PlaceProvider'
import { createContext } from 'react'

export type PlaceContextProps = {
  createPlace: (data: CreatePlaceProps) => void
  searchedPlace: SearchPlaceProps[]
  atributePlaceToMe: (data: AtributePlaceToMeProps) => void
  myNonVisitedPlace: MyNonVisitedPlaceProps[]
  iVisitedThisPlace: (data: IVisitedThisPlaceProps) => void
  myVisitedPlaces: MyVisitedPlacesProps[]
}

export const PlaceContext = createContext({} as PlaceContextProps)
