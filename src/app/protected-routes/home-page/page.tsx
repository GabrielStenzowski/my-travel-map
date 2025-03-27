'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { DashboardPlace } from '../dashboard-places/page'
import { DashboardCategoryVisitedPlaces } from '../dashboard-category-visited-places/page'
import VisitedPlaces from '../visited-places/page'
import { useState } from 'react'
import ModalVisitedPlace from '../components/modalVistedPlace'
interface Lugar {
  id: string
  nome: string
  localizacao: string
  opiniao: string
  rating: number
}
export default function HomePage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [lugarSelecionado, setLugarSelecionado] = useState<Lugar | null>(null)

  const handleOpenModal = (lugar: Lugar) => {
    setLugarSelecionado(lugar)
    setModalOpen(true)
  }
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        🌍 Meu Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Gerencie seus lugares visitados e os que deseja visitar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <DashboardPlace />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardCategoryVisitedPlaces />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
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
            <p className="text-gray-500 dark:text-gray-400">
              Aqui estão os lugares que deseja visitar.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => router.push('/protected-routes/register-place')}>
          ➕ Cadastrar Lugar
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/protected-routes/listar-lugares')}
        >
          📋 Listar Lugares
        </Button>
      </div>
      {lugarSelecionado && (
        <ModalVisitedPlace
          lugarSelecionado={lugarSelecionado}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  )
}
