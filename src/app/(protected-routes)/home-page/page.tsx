'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import ModalVisitedPlace from '../components/modalVisitedPlace'

import ModalNonVisitedPlace from '../components/modalNonVisitedPlace'
import DashboardCategoryVisitedPlaces from '../dashboard-category-visited-places/page'
import DashboardPlace from '../dashboard-places/page'
import ModalMyLocationAndLocationPlace from '../components/modalMyLocationToLocationPlace'
import { NonVisitedPlace } from '../components/nonVisitedPlace'
import { VisitedPlaces } from '../components/visitedPlace'
interface SearchPlaceProps {
  id: string
  name: string
  googlePlaceId: string
  location: string
  categoryId: string
  ideaUserId: string
}
interface RatingProps {
  ambiente: number
  atendimento: number
  comida: number
  preco: number
}
interface VisitedPlace {
  averageRating: number
  id: string
  opinion: string
  placeId: string
  place: SearchPlaceProps
  ratings: RatingProps
  userId: string
  wouldReturn: 'yes' | 'no'
}

interface NonVisitedPlace {
  id: string
  name: string
  location: string
  userId: string
  placeId: string
}

export default function HomePage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalNonVisitedPlaceOpen, setModalNonVisitedPlaceOpen] =
    useState(false)
  const [lugarSelecionado, setLugarSelecionado] = useState<VisitedPlace | null>(
    null
  )
  const [placeNonVisitedSelected, setPlaceNonVisitedSelected] =
    useState<NonVisitedPlace | null>(null)

  const [modalMyLocationOpen, setModalMyLocationOpen] = useState(false)
  const [selectedGooglePlaceId, setSelectedGooglePlaceId] = useState('')

  const handleOpenModal = (lugar: VisitedPlace) => {
    setLugarSelecionado(lugar)
    setModalOpen(true)
  }

  const handleOpenNonVisitedPlaceModal = (place: NonVisitedPlace) => {
    setPlaceNonVisitedSelected(place)
    setModalNonVisitedPlaceOpen(true)
  }

  const handleOpenMyLocationModal = (location: string) => {
    setSelectedGooglePlaceId(location)
    setModalMyLocationOpen(true)
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 w-full p-6 space-y-6">
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        🌍 Meu Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Gerencie seus lugares visitados e os que deseja visitar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-8xl">
        <Card className="pt-6">
          <CardContent>
            <DashboardPlace />
          </CardContent>
        </Card>
        <Card className="pt-6">
          <CardContent>
            <DashboardCategoryVisitedPlaces />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>🌟 Lugares Visitados</CardTitle>
            </CardHeader>
            <CardContent>
              <VisitedPlaces onPlaceClick={handleOpenModal} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📌 Lugares Desejados</CardTitle>
            </CardHeader>
            <CardContent>
              <NonVisitedPlace
                onNonVisitedPlaceClick={handleOpenNonVisitedPlaceModal}
                onLocalClick={handleOpenMyLocationModal}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <Button onClick={() => router.push('register-place')}>
          ➕ Cadastrar Lugar
        </Button>
        <Button variant="outline" onClick={() => router.push('list-places')}>
          📋 Listar Lugares
        </Button>
      </div>
      {lugarSelecionado && (
        <ModalVisitedPlace
          selectedPlace={lugarSelecionado}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}

      {placeNonVisitedSelected && (
        <ModalNonVisitedPlace
          selectedNonVisitedPlace={placeNonVisitedSelected}
          modalNonVisitedOpen={modalNonVisitedPlaceOpen}
          setModalNonVisitedPlaceOpen={setModalNonVisitedPlaceOpen}
        />
      )}

      {modalMyLocationOpen && (
        <ModalMyLocationAndLocationPlace
          googlePlaceId={selectedGooglePlaceId}
          modalMyLocationOpen={modalMyLocationOpen}
          setModalMyLocationOpen={setModalMyLocationOpen}
        />
      )}
    </div>
  )
}
