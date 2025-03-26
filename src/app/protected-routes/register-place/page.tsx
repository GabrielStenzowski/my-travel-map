// app/dashboard/cadastrar-lugar/page.tsx

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

// import { useRouter } from 'next/navigation'
import { Wrapper } from 'daju-ui-components'
import { Card, CardContent } from '@/components/ui/card'
import Map from '@/components/map'

export default function CadastrarLugar() {
  // const router = useRouter()
  const [nome, setNome] = useState('')
  const [location, setLocation] = useState('')
  const [geoLocation, setGeoLocation] = useState({
    lat: -25.4284,
    lng: -49.2733,
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [categoria, setCategoria] = useState('')
  const [loading, setLoading] = useState(false)

  const dimentions = {
    width: '100%',
    height: '300px',
  }

  async function searchLocation(namePlace: string) {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: namePlace,
            key: apiKey,
          },
        }
      )

      if (response.data.results.length === 0) {
        console.error('Local não encontrado')
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
  console.log(geoLocation)
  const handleCadastrar = async () => {
    console.log({ nome, location, geoLocation, categoria })
  }
  const handleSearchLocation = async () => {
    setLoading(true)
    await searchLocation(nome)
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
