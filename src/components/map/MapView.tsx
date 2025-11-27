import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import type { Station } from '../../types/station'
import 'leaflet/dist/leaflet.css'
import type { FuelKey } from '../../types/fuels'

interface MapViewProps {
  stations: Station[]
  activeFuel: FuelKey
  resolvePrice: (station: Station) => { value: number | null; derived: boolean }
  center?: { lat: number; lng: number }
}

const DEFAULT_CENTER: [number, number] = [13.7563, 100.5018]
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export function MapView({ stations, activeFuel, resolvePrice, center }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const pinsLayerRef = useRef<L.LayerGroup | null>(null)
  const hasFitBounds = useRef(false)

  const displayStations = useMemo(() => stations.filter((s) => !!s.lat && !!s.lng), [stations])

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(center ? [center.lat, center.lng] : DEFAULT_CENTER, center ? 11 : 6)

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
      const priceInfo = resolvePrice(station)
      const price = priceInfo.value
      const fuelSticker = Object.keys(station.fuels ?? {})
      const fuelsLabel = fuelSticker.length ? fuelSticker.join(', ').toUpperCase() : 'FUEL DATA TBD'

      const marker = L.marker(coords, {
        icon: L.divIcon({
          className: '',
          html: `<div style="background:#111827;color:#f8fafc;border-radius:14px;padding:8px 12px;min-width:64px;text-align:center;font-family:'Inter',sans-serif;box-shadow:0 8px 20px rgba(2,6,23,0.45);border:1px solid rgba(255,255,255,0.1);">
            <div style="font-size:16px;font-weight:700;">${price ? price.toFixed(2) : '—'}</div>
            <div style="font-size:10px;letter-spacing:0.05em;opacity:0.8;">THB/L</div>
          </div>`,
          iconSize: [80, 56],
          iconAnchor: [40, 56]
        })
      })

      marker
        .bindPopup(
          `<strong>${station.name}</strong><br/>Province: ${station.province}<br/>${activeFuel.toUpperCase()} price: ${
            price ? `${price.toFixed(2)} THB/L` : 'N/A'
          }`
        )
        .bindTooltip(fuelsLabel, { sticky: true })

      pinsLayerRef.current?.addLayer(marker)
    })

    if (!hasFitBounds.current && displayStations.length > 0) {
      const bounds = L.latLngBounds(displayStations.map((station) => [station.lat, station.lng]))
      mapInstanceRef.current.fitBounds(bounds.pad(0.2))
      hasFitBounds.current = true
    }
  }, [displayStations, resolvePrice, activeFuel])

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div ref={mapContainerRef} className="h-[360px] w-full" />

      <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-center justify-between rounded-2xl bg-black/40 px-4 py-2 text-xs font-medium text-white backdrop-blur">
        <span>{displayStations.length} stations mapped</span>
        <span>Layer: Leaflet · OpenStreetMap</span>
      </div>
    </div>
  )
}
