'use client'

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

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

interface ModalVisitedPlaceProps {
  selectedPlace: {
    averageRating: number
    id: string
    opinion: string
    placeId: string
    place: SearchPlaceProps
    ratings: RatingProps
    userId: string
    wouldReturn: 'yes' | 'no'
  }
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

export default function ModalVisitedPlace({
  selectedPlace,
  modalOpen,
  setModalOpen,
}: ModalVisitedPlaceProps) {
  if (!selectedPlace) return null

  const { place, opinion, ratings, averageRating, wouldReturn } = selectedPlace

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{place.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Localização:</strong>{' '}
            {place.location}
          </p>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">
              {averageRating.toFixed(1)} / 5.0
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <RatingItem label="Ambiente" value={ratings.ambiente} />
            <RatingItem label="Atendimento" value={ratings.atendimento} />
            <RatingItem label="Comida" value={ratings.comida} />
            <RatingItem label="Preço" value={ratings.preco} />
          </div>

          <div>
            <strong>Opinião:</strong>
            <p className="mt-1 text-muted-foreground">{opinion}</p>
          </div>

          <div>
            <strong>Voltaria?</strong>
            <div className="mt-1">
              <Badge
                variant={wouldReturn === 'yes' ? 'default' : 'destructive'}
              >
                {wouldReturn === 'yes' ? 'Sim' : 'Não'}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RatingItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
      <span className="text-sm">{label}</span>
      <span className="font-semibold">{value.toFixed(1)}</span>
    </div>
  )
}
