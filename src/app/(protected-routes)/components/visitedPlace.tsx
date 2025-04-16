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
import { UsePlace } from '@/hooks/usePlace'
import { Star, StarHalf } from 'lucide-react'

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
interface PlaceProps {
  averageRating: number
  id: string
  opinion: string
  placeId: string
  place: SearchPlaceProps
  ratings: RatingProps
  userId: string
  wouldReturn: 'yes' | 'no'
}

interface VisitedPlacesProps {
  onPlaceClick: (Place: PlaceProps) => void
}

export function VisitedPlaces({ onPlaceClick }: VisitedPlacesProps) {
  const { myVisitedPlaces } = UsePlace()
  console.log(myVisitedPlaces)
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
          {myVisitedPlaces.map((place) => (
            <TableRow
              key={place.id}
              onClick={() => onPlaceClick(place)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell>{place.place.name}</TableCell>

              <TableCell>
                {Array.from({ length: Math.floor(place.averageRating) }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 inline"
                    />
                  )
                )}
                {place.averageRating % 1 >= 0.5 && (
                  <StarHalf size={16} className="text-yellow-500 inline" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
