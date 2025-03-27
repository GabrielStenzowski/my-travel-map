'use client'

import axios from 'axios'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useRouter } from 'next/navigation'
import { Wrapper } from 'daju-ui-components'
import { Card, CardContent } from '@/components/ui/card'
import Map from '@/components/map'

type PlacePredictionProps = {
  place: string
  placeId: string
  structuredFormat: {
    mainText: {
      text: string
    }
    secondaryText: {
      text: string
    }
  }
  text: {
    text: string
  }
  types: string[]
}

type sugestionProps = {
  placePrediction: PlacePredictionProps
}

export default function CadastrarLugar() {
  const router = useRouter()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const [nome, setNome] = useState('')
  const [location, setLocation] = useState('')
  const [geoLocation, setGeoLocation] = useState({
    lat: -25.4284,
    lng: -49.2733,
  })
  const [sugestoes, setSugestoes] = useState<sugestionProps[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('')

  const [categoria, setCategoria] = useState('')
  const [loading, setLoading] = useState(false)

  const dimentions = {
    width: '100%',
    height: '300px',
  }

  async function searchSuggestionLocation(namePlace: string) {
    try {
      const response = await axios.post(
        'https://places.googleapis.com/v1/places:autocomplete',
        {
          input: namePlace,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
          },
        }
      )

      if (response.data.suggestions.length === 0) {
        alert('Local não encontrado')
        return
      }

      setSugestoes(response.data.suggestions || [])
    } catch (error) {
      console.error('Erro na requisição:', error)
      return null
    }
  }

  async function searchLocationById(placeId: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            place_id: placeId,
            key: apiKey,
          },
        }
      )
      if (response.data.results.length === 0) {
        alert('Local não encontrado')
        return
      }

      setLocation(response.data.results[0].formatted_address)
      setGeoLocation({
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng,
      })
    } catch (error) {
      console.error('Erro na requisição:', error)
      return null
    }
  }
  function handleSearchLocationByPlaceId(placeId: string) {
    setSelectedPlaceId(placeId)
    searchLocationById(placeId)
  }

  const handleCadastrar = async () => {
    console.log({ nome, selectedPlaceId, location, geoLocation, categoria })
    router.push('/protected-routes/home-page')
  }

  const handleSearchLocation = async () => {
    setLoading(true)
    await searchSuggestionLocation(nome)
    setLoading(false)
  }

  return (
    <Wrapper title="Cadastrar Novo Lugar">
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-7xl shadow-lg">
          <CardContent className="pt-5">
            <div className="mb-4">
              <Label>Nome do Lugar</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome do lugar"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Button onClick={handleSearchLocation} disabled={loading}>
                  {loading ? 'Buscando...' : 'Pesquisar'}
                </Button>
              </div>
              {sugestoes.map((sugestao, index) => (
                <div
                  key={sugestao.placePrediction.placeId || index}
                  className="border rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    handleSearchLocationByPlaceId(
                      sugestao.placePrediction.placeId
                    )
                  }
                >
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {sugestao.placePrediction.structuredFormat.mainText.text}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {
                        sugestao.placePrediction.structuredFormat.secondaryText
                          .text
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <Label>Localização</Label>
              <Input
                id="localizacao"
                placeholder="Digite o nome do lugar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Map
                locationPlace={geoLocation}
                mapDimentions={dimentions}
                zoom={16}
              />
            </div>

            <div className="mb-4">
              <Label>Categoria</Label>
              <Select onValueChange={setCategoria} value={categoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="praia">Praia</SelectItem>
                  <SelectItem value="montanha">Montanha</SelectItem>
                  <SelectItem value="cidade">Cidade</SelectItem>
                  <SelectItem value="Histórico">Histórico</SelectItem>
                  <SelectItem value="Restaurante">Restaurante</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCadastrar}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Lugar'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  )
}
