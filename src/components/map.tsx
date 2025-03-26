'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

interface mapProps {
  locationPlace: { lat: number; lng: number }
  zoom: number
  mapDimentions: { width: string; height: string }
}

export default function Map({ locationPlace, zoom, mapDimentions }: mapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (loadError) return <p>Erro ao carregar o mapa</p>
  if (!isLoaded) return <p>Carregando...</p>

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapDimentions}
        center={locationPlace}
        zoom={zoom}
      >
        <Marker position={locationPlace} />
      </GoogleMap>
    </>
  )
}
