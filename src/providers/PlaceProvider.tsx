'use client'

import { api } from '@/api'
import { PlaceContext } from '@/context/PlaceContext'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

type PlaceProviderProps = {
  children: ReactNode
}

export type CreatePlaceProps = {
  name: string
  googlePlaceId: string
  location: string
  categoryId: string
  ideaUserId: string | null
}

export type SearchPlaceProps = {
  id: string
  name: string
  googlePlaceId: string
  location: string
  categoryId: string
  ideaUserId: string
}

export type AtributePlaceToMeProps = {
  userId: string | null
  placeId: string
  active: boolean
}

export type MyNonVisitedPlaceProps = {
  id: string
  userId: string
  placeId: string
  visited: boolean
  active: boolean
  place: SearchPlaceProps
}
export function PlaceProvider({ children }: PlaceProviderProps) {
  const router = useRouter()
  const userId = localStorage.getItem('user-id')
  const [searchedPlace, setSearchedPlace] = useState<SearchPlaceProps[]>([])
  const [myNonVisitedPlace, setMyNonVisitedPlace] = useState<
    MyNonVisitedPlaceProps[]
  >([])
  const createPlace = async ({
    name,
    googlePlaceId,
    location,
    categoryId,
    ideaUserId,
  }: CreatePlaceProps) => {
    try {
      const response = await api.post('/place', {
        name,
        googlePlaceId,
        location,
        categoryId,
        ideaUserId,
      })
      if (response.status === 201) {
        router.push('/protected-routes/home-page')
      }
    } catch (error) {
      console.error('Erro ao criar lugar', error)
    }
  }

  const fetchSearchPlace = async () => {
    try {
      const response = await api.get('/place')
      setSearchedPlace(response.data)
    } catch (error) {
      console.error('erro ao achar lugares', error)
    }
  }

  const atributePlaceToMe = async ({
    userId,
    placeId,
    active,
  }: AtributePlaceToMeProps) => {
    try {
      const response = await api.post('/user_place', {
        userId,
        placeId,
        active,
        visited: false,
      })

      if (response.status === 201) {
        router.push('/protected-routes/home-page')
      }
    } catch (error) {
      console.error('Erro ao criar lugar', error)
    }
  }

  const fetchNameUserPlace = async (placeId: string) => {
    try {
      const response = await api.get(`/place/${placeId}`)
      return response.data
    } catch (error) {
      console.error('erro ao achar lugares', error)
    }
  }

  const fetchNonVisitedPlace = async () => {
    try {
      const responseUserPlace = await api.get(
        `/user_place?userId` + userId + `&visited=false&active=true`
      )
      if (responseUserPlace.data.length > 0) {
        const fullPlaces = await Promise.all(
          responseUserPlace.data.map(
            async (userPlace: AtributePlaceToMeProps) => {
              const placeData = await fetchNameUserPlace(userPlace.placeId)
              return {
                ...userPlace,
                place: placeData,
              }
            }
          )
        )
        setMyNonVisitedPlace(fullPlaces)
      }
    } catch (error) {
      console.error('erro ao achar lugares', error)
    }
  }
  useEffect(() => {
    fetchSearchPlace()
    fetchNonVisitedPlace()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    createPlace,
    searchedPlace,
    atributePlaceToMe,
    myNonVisitedPlace,
  }
  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
}
