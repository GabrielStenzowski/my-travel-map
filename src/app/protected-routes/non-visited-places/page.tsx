'use client'

import { useState } from 'react'
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

interface Lugar {
  id: string
  nome: string
  localizacao: string
  opiniao: string
  desejaVisitar?: boolean
}

const lugares: Lugar[] = [
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

export default function NonVisitedPlace() {
  const [listaLugares, setListaLugares] = useState(lugares)

  const marcarComoDesejado = (id: string) => {
    setListaLugares((prevLugares) =>
      prevLugares.map((lugar) =>
        lugar.id === id
          ? { ...lugar, desejaVisitar: !lugar.desejaVisitar }
          : lugar
      )
    )
  }

  return (
    <Table>
      <TableCaption>Lista de lugares não visitados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Lugar</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listaLugares.map((lugar) => (
          <TableRow key={lugar.id}>
            <TableCell>{lugar.nome}</TableCell>
            <TableCell>
              <Button
                onClick={() => marcarComoDesejado(lugar.id)}
                variant={lugar.desejaVisitar ? 'destructive' : 'default'}
              >
                {lugar.desejaVisitar ? 'Remover da lista' : 'Quero visitar'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
