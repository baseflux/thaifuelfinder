import { useCallback, useMemo, useState } from 'react'
import type { FuelKey } from './types/fuels'
import type { Station } from './types/station'
import { MapView } from './components/map/MapView'

const PATTAYA_BOUNDS = {
  center: { lat: 12.9246, lng: 100.8841 }
}

const FUEL_OPTIONS: { key: FuelKey; label: string }[] = [
  { key: 'gasohol95', label: 'Gasohol 95' },
  { key: 'e20', label: 'E20' },
  { key: 'e85', label: 'E85' },
  { key: 'b7', label: 'Diesel B7' },
  { key: 'premium', label: 'Premium Diesel' }
]

const PROVINCE_PRICE_BANDS: Record<string, { min: number; max: number }> = {
  Chonburi: { min: 39.8, max: 43.8 },
  Bangkok: { min: 40.2, max: 44.2 },
  Rayong: { min: 39.5, max: 43.0 },
  'Prachuap Khiri Khan': { min: 38.8, max: 42.5 }
}
const DEFAULT_BAND = { min: 39, max: 45 }

const pattayaStations: Station[] = [
  {
    id: 'PTT-NORTH',
    name: 'PTT North Pattaya',
    brand: 'PTT',
    province: 'Chonburi',
    district: 'Pattaya City',
    lat: 12.972,
    lng: 100.905,
    fuels: {
      gasohol95: { price: 42.1, lastUpdated: 1732506000 },
      e20: { price: 39.6, lastUpdated: 1732506000 },
      b7: { price: 33.2, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'BANGCHAK-KLANG',
    name: 'Bangchak Pattaya Klang',
    brand: 'Bangchak',
    province: 'Chonburi',
    district: 'Pattaya City',
    lat: 12.933,
    lng: 100.9,
    fuels: {
      gasohol95: { price: 41.8, lastUpdated: 1732506000 },
      e20: { price: 39.1, lastUpdated: 1732506000 },
      e85: { price: 35.9, lastUpdated: 1732506000 },
      b7: { price: 33.4, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'SHELL-MARINA',
    name: 'Shell Central Marina',
    brand: 'Shell',
    province: 'Chonburi',
    district: 'Na Kluea',
    lat: 12.954,
    lng: 100.89,
    fuels: {
      gasohol95: { price: 42.7, lastUpdated: 1732506000 },
      e20: { price: 40.3, lastUpdated: 1732506000 },
      premium: { price: 46.1, lastUpdated: 1732506000 }
    },
    flags: 1
  },
  {
    id: 'ESSO-SUKHUMVIT',
    name: 'Esso Sukhumvit Pattaya',
    brand: 'Esso',
    province: 'Chonburi',
    district: 'Pattaya City',
    lat: 12.929,
    lng: 100.916,
    fuels: {
      gasohol95: { price: 41.9, lastUpdated: 1732506000 },
      e20: { price: 39.4, lastUpdated: 1732506000 },
      e85: { price: 36.1, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'CALTEXT-JOMTIEN',
    name: 'Caltex Jomtien Second Rd',
    brand: 'Caltex',
    province: 'Chonburi',
    district: 'Jomtien',
    lat: 12.887,
    lng: 100.875,
    fuels: {
      gasohol95: { price: 41.4, lastUpdated: 1732506000 },
      e20: { price: 39.0, lastUpdated: 1732506000 },
      b7: { price: 33.1, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'PTY-BYPASS',
    name: 'PT Hua Hin Bypass',
    brand: 'PT',
    province: 'Prachuap Khiri Khan',
    district: 'Hua Hin',
    lat: 12.598,
    lng: 99.957,
    fuels: {
      gasohol95: { price: 41.2, lastUpdated: 1732506000 },
      e20: { price: 38.6, lastUpdated: 1732506000 },
      e85: { price: 35.8, lastUpdated: 1732506000 },
      b7: { price: 33.1, lastUpdated: 1732506000 }
    },
    flags: 2
  },
  {
    id: 'PTT-RAYONG',
    name: 'PTT Rayong Bypass',
    brand: 'PTT',
    province: 'Rayong',
    district: 'Mueang Rayong',
    lat: 12.706,
    lng: 101.218,
    fuels: {
      gasohol95: { price: 41.6, lastUpdated: 1732506000 },
      e20: { price: 38.9, lastUpdated: 1732506000 },
      b7: { price: 32.9, lastUpdated: 1732506000 },
      premium: { price: 45.3, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'PTG-SATTAHIP',
    name: 'PTG Sattahip',
    brand: 'PTG',
    province: 'Chonburi',
    district: 'Sattahip',
    lat: 12.668,
    lng: 100.938,
    fuels: {
      gasohol95: { price: 41.3, lastUpdated: 1732506000 },
      e20: { price: 38.7, lastUpdated: 1732506000 },
      e85: { price: 35.6, lastUpdated: 1732506000 }
    },
    flags: 1
  },
  {
    id: 'BANGCHAK-SRIRACHA',
    name: 'Bangchak Si Racha',
    brand: 'Bangchak',
    province: 'Chonburi',
    district: 'Si Racha',
    lat: 13.167,
    lng: 100.93,
    fuels: {
      gasohol95: { price: 41.7, lastUpdated: 1732506000 },
      e20: { price: 39.2, lastUpdated: 1732506000 },
      b7: { price: 33.3, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'SUSCO-CHONBURI',
    name: 'Susco Chonburi Bypass',
    brand: 'Susco',
    province: 'Chonburi',
    district: 'Mueang Chonburi',
    lat: 13.336,
    lng: 100.95,
    fuels: {
      gasohol95: { price: 41.5, lastUpdated: 1732506000 },
      e20: { price: 38.8, lastUpdated: 1732506000 },
      premium: { price: 45.4, lastUpdated: 1732506000 }
    },
    flags: 0
  }
]

const formatFuelSticker = (station: Station) => {
  const fuels = Object.keys(station.fuels ?? {})
  return fuels.length ? fuels.join(' · ').toUpperCase() : 'FUEL DATA TBD'
}

const deterministicValue = (id: string, fuel: FuelKey) =>
  id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) + fuel.charCodeAt(0)

const calculatePrice = (station: Station, fuel: FuelKey) => {
  const direct = station.fuels?.[fuel]?.price
  if (direct) {
    return { value: direct, derived: false }
  }
  const band = PROVINCE_PRICE_BANDS[station.province] ?? DEFAULT_BAND
  const seed = deterministicValue(station.id, fuel) % 100
  const value = band.min + (seed / 100) * (band.max - band.min)
  return { value: parseFloat(value.toFixed(2)), derived: true }
}

function App() {
  const [selectedFuel, setSelectedFuel] = useState<FuelKey>('gasohol95')

  const priceResolver = useCallback(
    (station: Station) => calculatePrice(station, selectedFuel),
    [selectedFuel]
  )

  const resolvedStations = useMemo(
    () =>
      pattayaStations.map((station) => ({
        ...station,
        priceInfo: calculatePrice(station, selectedFuel)
      })),
    [selectedFuel]
  )
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/80">THAI FuelFind</p>
            <h1 className="text-4xl font-semibold">Live fuel insights across Thailand</h1>
            <p className="mt-3 text-white/80">
              Built with React, Vite, Firebase, Leaflet, and the agent pipeline described in{' '}
              <code className="rounded bg-white/10 px-2 py-1">thai-fuelfind-complete-spec.md</code>.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-6 py-4 text-white">
            <p className="text-sm uppercase tracking-wide">Focus area</p>
            <p className="text-3xl font-bold">Pattaya & Eastern Seaboard</p>
            <p className="text-sm text-white/80">Select a fuel to see Thai baht per litre overlays.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[3fr,2fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <input
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm shadow-inner outline-none focus:border-primary"
                placeholder="Search postcode or province… (91403 style input)"
                defaultValue="20150"
              />
              <div className="flex gap-2">
                {FUEL_OPTIONS.map((fuel) => (
                  <button
                    key={fuel.key}
                    onClick={() => setSelectedFuel(fuel.key)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedFuel === fuel.key
                        ? 'bg-primary text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {fuel.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MapView stations={pattayaStations} activeFuel={selectedFuel} resolvePrice={priceResolver} center={PATTAYA_BOUNDS.center} />
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Next Agent Tasks</h2>
            <ul className="mt-4 space-y-4 text-slate-700">
              <li className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">PriceAgent</p>
                <p className="text-base font-medium">Wire Firestore listener for `stations` collection</p>
                <p className="text-sm text-slate-500">
                  Use `validatePrice` from <code>src/utils/priceValidation.ts</code>
                </p>
              </li>
              <li className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Map module</p>
                <p className="text-base font-medium">
                  Drop Leaflet map skeleton inside `src/components/map/MapView.tsx`
                </p>
                <p className="text-sm text-slate-500">Remember bilingual labels via `src/config/i18n.ts`.</p>
              </li>
              <li className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">BackupAgent</p>
                <p className="text-base font-medium">Trigger bucket backup when &gt;50 stations update in batch</p>
                <p className="text-sm text-slate-500">Docs captured in `design.md` (coming soon).</p>
              </li>
            </ul>
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Stations in view</h3>
          <p className="text-sm text-slate-500">
            Prices shown in THB/L for <span className="font-semibold text-primary">{FUEL_OPTIONS.find((f) => f.key === selectedFuel)?.label}</span>.
          </p>
          <ul className="mt-4 space-y-3">
            {resolvedStations.map((station) => {
              const { value, derived } = station.priceInfo
              return (
                <li
                  key={station.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="pointer-events-none absolute right-4 top-3 hidden rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white shadow group-hover:block">
                    {formatFuelSticker(station)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{station.name}</p>
                    <p className="text-sm text-slate-500">{station.province}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-accent">
                      {value?.toFixed(2) ?? '—'}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {derived ? 'THB/L (est.)' : 'THB/L'}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </aside>
      </main>
    </div>
  )
}

export default App
