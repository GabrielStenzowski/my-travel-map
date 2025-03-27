'use client'

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

interface ModalVisitedPlaceProps {
  lugarSelecionado: {
    nome: string
    localizacao: string
    opiniao: string
  }
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
}

export default function ModalVisitedPlace({
  lugarSelecionado,
  modalOpen,
  setModalOpen,
}: ModalVisitedPlaceProps) {
  if (!lugarSelecionado) return null

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lugarSelecionado.nome}</DialogTitle>
        </DialogHeader>
        <p>
          <strong>Localização:</strong> {lugarSelecionado.localizacao}
        </p>
        <p>
          <strong>Opinião:</strong> {lugarSelecionado.opiniao}
        </p>
      </DialogContent>
    </Dialog>
  )
}
