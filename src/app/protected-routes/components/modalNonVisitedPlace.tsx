'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface ModalNonVisitedPlaceProps {
  selectedNonVisitedPlace: {
    id: string
    nome: string
    localizacao: string
  }
  modalNonVisitedOpen: boolean
  setModalNonVisitedPlaceOpen: (open: boolean) => void
}

export default function ModalNonVisitedPlace({
  selectedNonVisitedPlace,
  modalNonVisitedOpen,
  setModalNonVisitedPlaceOpen,
}: ModalNonVisitedPlaceProps) {
  const [ratings, setRatings] = useState({
    ambiente: 0,
    atendimento: 0,
    comida: 0,
    preco: 0,
  })
  const [opinion, setOpinion] = useState('')
  const [wouldReturn, setWouldReturn] = useState<string | null>(null)

  if (!selectedNonVisitedPlace) return null

  const handleRating = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }

  return (
    <Dialog
      open={modalNonVisitedOpen}
      onOpenChange={setModalNonVisitedPlaceOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedNonVisitedPlace.nome}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>
            <strong>Localização:</strong> {selectedNonVisitedPlace.localizacao}
          </p>

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
        </DialogDescription>
        <Button onClick={() => console.log({ ratings, opinion, wouldReturn })}>
          Enviar Avaliação
        </Button>
      </DialogContent>
    </Dialog>
  )
}
