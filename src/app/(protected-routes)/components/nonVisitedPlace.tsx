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
import { UsePlace } from '@/hooks/usePlace'

interface PlaceNonVisited {
  id: string
  name: string
  location: string
  userId: string
  placeId: string
}

interface NonVisitedPlaceProps {
  onNonVisitedPlaceClick: (place: PlaceNonVisited) => void
  onLocalClick: (location: string) => void
}

export function NonVisitedPlace({
  onNonVisitedPlaceClick,
  onLocalClick,
}: NonVisitedPlaceProps) {
  const { myNonVisitedPlace } = UsePlace()

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
        {myNonVisitedPlace.map((place) => (
          <TableRow key={place.id}>
            <TableCell>{place.place.name}</TableCell>
            <TableCell>
              <Button onClick={() => onLocalClick(place.place.location)}>
                Local
              </Button>
            </TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  onNonVisitedPlaceClick({
                    id: place.id,
                    name: place.place.name,
                    location: place.place.location,
                    userId: place.userId,
                    placeId: place.placeId,
                  })
                }
                variant={place.visited ? 'destructive' : 'default'}
              >
                {place.visited ? 'Remover da lista' : 'Lugar Visitado ?'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
