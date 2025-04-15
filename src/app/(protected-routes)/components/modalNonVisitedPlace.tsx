'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { UsePlace } from '@/hooks/usePlace'

interface ModalNonVisitedPlaceProps {
  selectedNonVisitedPlace: {
    id: string
    placeId: string
    name: string
    location: string
    userId: string
  }
  modalNonVisitedOpen: boolean
  setModalNonVisitedPlaceOpen: (open: boolean) => void
}

export default function ModalNonVisitedPlace({
  selectedNonVisitedPlace,
  modalNonVisitedOpen,
  setModalNonVisitedPlaceOpen,
}: ModalNonVisitedPlaceProps) {
  const { iVisitedThisPlace } = UsePlace()
  const [ratings, setRatings] = useState({
    ambiente: 0,
    atendimento: 0,
    comida: 0,
    preco: 0,
  })
  const [opinion, setOpinion] = useState('')
  const [wouldReturn, setWouldReturn] = useState<string>('')

  if (!selectedNonVisitedPlace) return null

  const handleRating = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }

  const handleSaveVisitedPlace = async () => {
    const ratingsArray = Object.values(ratings)
    const averageRating =
      ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length

    iVisitedThisPlace({
      id: selectedNonVisitedPlace.id,
      userId: selectedNonVisitedPlace.userId,
      placeId: selectedNonVisitedPlace.placeId,
      ratings,
      opinion,
      wouldReturn,
      averageRating,
    })
    setOpinion('')
    setWouldReturn('')
    setRatings({ ambiente: 0, atendimento: 0, comida: 0, preco: 0 })
    setModalNonVisitedPlaceOpen(false)
  }

  return (
    <Dialog
      open={modalNonVisitedOpen}
      onOpenChange={setModalNonVisitedPlaceOpen}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{selectedNonVisitedPlace.name}</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          <strong>Localização:</strong> {selectedNonVisitedPlace.location}
        </div>
        {['ambiente', 'atendimento', 'comida', 'preco'].map((category) => (
          <div key={category} className="flex items-center gap-2 mt-2">
            <span className="capitalize">{category}:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${
                  ratings[category as keyof typeof ratings] >= star
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }`}
                onClick={() => handleRating(category, star)}
              />
            ))}
          </div>
        ))}
        <Textarea
          placeholder="Deixe sua opinião..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
          className="mt-4"
        />
        <div className="mt-4">
          <Label>
            <strong>Voltaria?</strong>
          </Label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={wouldReturn === 'yes'}
                onCheckedChange={() => setWouldReturn('yes')}
              />
              Sim
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={wouldReturn === 'no'}
                onCheckedChange={() => setWouldReturn('no')}
              />
              Não
            </label>
          </div>
        </div>

        <Button onClick={handleSaveVisitedPlace}>
          Enviar Avaliação (EU VISITEI!!)
        </Button>
      </DialogContent>
    </Dialog>
  )
}
