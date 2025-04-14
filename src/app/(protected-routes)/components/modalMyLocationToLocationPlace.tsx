'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
interface ModalMyLocationProps {
  modalMyLocationOpen: boolean
  setModalMyLocationOpen: (open: boolean) => void
  googlePlaceId: string
}
export default function ModalMyLocationAndLocationPlace({
  googlePlaceId,
  modalMyLocationOpen,
  setModalMyLocationOpen,
}: ModalMyLocationProps) {
  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log(navigator)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any) => {
          console.error(err)
          setError('Não foi possível obter a localização')
        }
      )
    } else {
      setError('Geolocalização não suportada pelo navegador')
    }
  }, [])

  return (
    <Dialog open={modalMyLocationOpen} onOpenChange={setModalMyLocationOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Minha localização</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {location ? (
            <>
              <p>
                Sua localização: Lat {location.lat}, Lng {location.lng}
              </p>
              <p>Localização: {googlePlaceId}</p>
            </>
          ) : error ? (
            <>
              <p>{error}</p>
            </>
          ) : (
            <>
              <p>Obtendo Localização</p>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
