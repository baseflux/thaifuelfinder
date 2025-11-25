import { useMemo } from 'react'
import type { Station } from '../../types/station'

interface MapViewProps {
  stations: Station[]
}

// Placeholder until Leaflet integration lands
export function MapView({ stations }: MapViewProps) {
  const summary = useMemo(() => stations.slice(0, 3), [stations])

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-slate-600">
      <p className="text-sm uppercase tracking-wide text-slate-400">Leaflet Map</p>
      <p className="text-lg font-semibold text-slate-900">Coming soon</p>
      <p className="mt-2 text-sm">
        Rendering {stations.length} stations. First pins:
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {summary.map((station) => (
          <li key={station.id}>
            <span className="font-medium text-slate-900">{station.name}</span> · {station.province}
          </li>
        ))}
      </ul>
    </div>
  )
}
