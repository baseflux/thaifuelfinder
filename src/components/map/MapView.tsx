import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import type { Station } from '../../types/station'
import 'leaflet/dist/leaflet.css'

interface MapViewProps {
  stations: Station[]
}

const DEFAULT_CENTER: [number, number] = [13.7563, 100.5018] // Bangkok
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export function MapView({ stations }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const pinsLayerRef = useRef<L.LayerGroup | null>(null)

  const displayStations = useMemo(() => stations.filter((s) => !!s.lat && !!s.lng), [stations])

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(DEFAULT_CENTER, 6)

    L.tileLayer(TILE_LAYER, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    pinsLayerRef.current = L.layerGroup().addTo(map)
    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
      pinsLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !pinsLayerRef.current) {
      return
    }

    pinsLayerRef.current.clearLayers()

    displayStations.forEach((station) => {
      const coords: [number, number] = [station.lat, station.lng]
      const price =
        Object.values(station.fuels ?? {}).find((fuel) => !!fuel)?.price ?? '—'
      const fuelSticker = Object.keys(station.fuels ?? {})
      const fuelsLabel = fuelSticker.length ? fuelSticker.join(', ').toUpperCase() : 'FUEL DATA TBD'

      const marker = L.marker(coords, {
        icon: L.divIcon({
          className: '',
          html: `<div style="background:#fff;border-radius:12px;padding:4px 10px;border:1px solid #0f6cbd;box-shadow:0 4px 12px rgba(8,23,40,0.12);font-family:Inter,sans-serif;font-size:12px;">
            <strong style="display:block;color:#0f172a">${station.name}</strong>
            <span style="color:#64748b">${station.province}</span>
          </div>`,
          iconSize: [140, 44],
          iconAnchor: [70, 44]
        })
      })

      marker
        .bindPopup(
          `<strong>${station.name}</strong><br/>Province: ${station.province}<br/>Price sample: ${price}`
        )
        .bindTooltip(fuelsLabel, { sticky: true })

      pinsLayerRef.current?.addLayer(marker)
    })

    if (displayStations.length > 0) {
      const bounds = L.latLngBounds(displayStations.map((station) => [station.lat, station.lng]))
      mapInstanceRef.current.fitBounds(bounds.pad(0.3))
    }
  }, [displayStations])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div ref={mapContainerRef} className="h-[360px] w-full" />

      <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-center justify-between rounded-2xl bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur">
        <span>{displayStations.length} stations loaded</span>
        <span>Leaflet · OpenStreetMap</span>
      </div>
    </div>
  )
}
