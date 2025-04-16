'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UseCategory } from '@/hooks/useCategory'
import { UsePlace } from '@/hooks/usePlace'
import { Wrapper } from 'daju-ui-components'
import { Button } from '@/components/ui/button'

export default function ListAllPlaces() {
  const { searchedPlace, atributePlaceToMe } = UsePlace()
  const { fetchCategoryById } = UseCategory()
  console.log(searchedPlace)
  const [categoryNames, setCategoryNames] = useState<Record<string, string>>({})
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    setUserId(localStorage.getItem('user-id') || 'user.id.loading')
  }, [])

  const handleAssignPlace = (placeId: string) => {
    atributePlaceToMe({
      placeId,
      userId,
      active: true,
    })
  }
  useEffect(() => {
    const loadCategories = async () => {
      const names: Record<string, string> = {}
      await Promise.all(
        searchedPlace.map(async (place) => {
          if (!names[place.categoryId]) {
            const category = await fetchCategoryById(place.categoryId)
            names[place.categoryId] = category?.category_name || 'Desconhecida'
          }
        })
      )

      setCategoryNames(names)
    }

    if (searchedPlace.length > 0) {
      loadCategories()
    }
  }, [searchedPlace, fetchCategoryById])

  return (
    <Wrapper title="🌟 Listar todos os lugares">
      <div className="flex justify-center items-center">
        <Card>
          <CardContent>
            <Table>
              <TableCaption>
                Lista de todos os lugares cadastrados no aplicativo.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Lugar</TableHead>
                  <TableHead>Categoria do Lugar</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Atribuir Lugar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchedPlace.map((lugar) => (
                  <TableRow key={lugar.id}>
                    <TableCell className="text-lg">{lugar.name}</TableCell>
                    <TableCell>
                      {categoryNames[lugar.categoryId] || 'Carregando...'}
                    </TableCell>
                    <TableCell>{lugar.location}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAssignPlace(lugar.id)}>
                        Atribuir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  )
}
