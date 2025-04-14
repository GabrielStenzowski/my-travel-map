'use client'

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Star } from 'lucide-react'

interface Lugar {
  id: string
  nome: string
  localizacao: string
  opiniao: string
  rating: number
}

const lugares: Lugar[] = [
  {
    id: '1',
    nome: 'Paris, França',
    localizacao: 'França',
    opiniao: 'Lugar incrível!',
    rating: 5,
  },
  {
    id: '2',
    nome: 'Roma, Itália',
    localizacao: 'Itália',
    opiniao: 'História viva!',
    rating: 4,
  },
  {
    id: '3',
    nome: 'Tóquio, Japão',
    localizacao: 'Japão',
    opiniao: 'Muito moderno!',
    rating: 5,
  },
  {
    id: '4',
    nome: 'Rio de Janeiro, Brasil',
    localizacao: 'Brasil',
    opiniao: 'Paisagens lindas!',
    rating: 4,
  },
]

interface VisitedPlacesProps {
  onPlaceClick: (lugar: Lugar) => void
}

export default function VisitedPlaces({ onPlaceClick }: VisitedPlacesProps) {
  return (
    <>
      <Table>
        <TableCaption>Lista de lugares visitados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Lugar</TableHead>
            <TableHead>Classificação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lugares.map((lugar) => (
            <TableRow
              key={lugar.id}
              onClick={() => onPlaceClick(lugar)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell>{lugar.nome}</TableCell>
              <TableCell>
                {[...Array(lugar.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 inline" />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
