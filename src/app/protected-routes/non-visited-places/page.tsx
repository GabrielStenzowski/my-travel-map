'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface LugarNonVisited {
  id: string
  nome: string
  localizacao: string
  opiniao: string
  desejaVisitar?: boolean
}

const lugares: LugarNonVisited[] = [
  {
    id: '1',
    nome: 'Paris, França',
    localizacao: 'França',
    opiniao: 'Lugar incrível!',
  },
  {
    id: '2',
    nome: 'Roma, Itália',
    localizacao: 'Itália',
    opiniao: 'História viva!',
  },
  {
    id: '3',
    nome: 'Tóquio, Japão',
    localizacao: 'Japão',
    opiniao: 'Muito moderno!',
  },
  {
    id: '4',
    nome: 'Rio de Janeiro, Brasil',
    localizacao: 'Brasil',
    opiniao: 'Paisagens lindas!',
  },
]

interface NonVisitedPlaceProps {
  onNonVisitedPlaceClick: (place: LugarNonVisited) => void
}

export default function NonVisitedPlace({
  onNonVisitedPlaceClick,
}: NonVisitedPlaceProps) {
  return (
    <Table>
      <TableCaption>Lista de lugares não visitados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Lugar</TableHead>
          <TableHead>Ver Localização</TableHead>
          <TableHead>Visitei ?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lugares.map((lugar) => (
          <TableRow key={lugar.id}>
            <TableCell>{lugar.nome}</TableCell>
            <TableCell>
              <Button>Local</Button>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => onNonVisitedPlaceClick(lugar)}
                variant={lugar.desejaVisitar ? 'destructive' : 'default'}
              >
                {lugar.desejaVisitar ? 'Remover da lista' : 'Lugar Visitado ?'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
