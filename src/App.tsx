import { useCallback, useMemo, useState } from 'react'
import type { FuelKey } from './types/fuels'
import type { Station } from './types/station'
import { MapView } from './components/map/MapView'
import { pattayaStations } from './data/pattayaStations'

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

const formatFuelSticker = (station: Station) => {
  const fuels = Object.keys(station.fuels ?? {})
  return fuels.length ? fuels.join(' · ').toUpperCase() : 'FUEL DATA TBD'
}

function App() {
  const [selectedFuel, setSelectedFuel] = useState<FuelKey>('gasohol95')
  const [brandFilters, setBrandFilters] = useState<string[]>([])

  const brandOptions = useMemo(() => {
    const unique = new Set<string>()
    pattayaStations.forEach((station) => {
      if (station.brand) unique.add(station.brand)
    })
    return Array.from(unique).sort()
  }, [])

  const toggleBrand = (brand: string) => {
    setBrandFilters((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearBrandFilters = () => setBrandFilters([])

  const priceResolver = useCallback(
    (station: Station) => {
      const price = station.fuels?.[selectedFuel]?.price ?? null
      return { value: price, derived: false }
    },
    [selectedFuel]
  )

  const filteredStations = useMemo(() => {
    return pattayaStations.filter((station) => {
      const hasFuel = Boolean(station.fuels?.[selectedFuel])
      const matchesBrand =
        brandFilters.length === 0 || (station.brand ? brandFilters.includes(station.brand) : false)
      return hasFuel && matchesBrand
    })
  }, [selectedFuel, brandFilters])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/80">THAI FuelFind</p>
            <h1 className="text-4xl font-semibold">GasBuddy-style Pattaya heatmap</h1>
            <p className="mt-3 text-white/80">
              Leaflet pins cover PTT, Bangchak, Shell, Esso, Caltex, PTG, PT, and Susco with blanket Thai baht
              pricing. Toggle the fuel you care about and highlight specific brands.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-6 py-4 text-white">
            <p className="text-sm uppercase tracking-wide">Focus area</p>
            <p className="text-3xl font-bold">Pattaya & Eastern Seaboard</p>
            <p className="text-sm text-white/80">Filter by fuel and brand to mimic GasBuddy UX.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[3fr,2fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <input
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm shadow-inner outline-none focus:border-primary"
                placeholder="Search postcode or province…"
                defaultValue="20150"
              />
              <div className="flex flex-wrap gap-2">
                {FUEL_OPTIONS.map((fuel) => (
                  <button
                    key={fuel.key}
                    onClick={() => setSelectedFuel(fuel.key)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brands</p>
              <div className="flex flex-wrap gap-2">
                {brandOptions.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      brandFilters.includes(brand)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                {brandFilters.length > 0 && (
                  <button onClick={clearBrandFilters} className="text-xs font-semibold text-primary underline">
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <MapView stations={filteredStations} activeFuel={selectedFuel} resolvePrice={priceResolver} center={PATTAYA_BOUNDS.center} />

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Next Agent Tasks</h2>
            <ul className="mt-4 space-y-4 text-slate-700">
              <li className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">PriceAgent</p>
                <p className="text-base font-medium">Wire Firestore listener for `stations` collection</p>
                <p className="text-sm text-slate-500">Use `validatePrice` from <code>src/utils/priceValidation.ts</code></p>
              </li>
              <li className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Map module</p>
                <p className="text-base font-medium">Drop Leaflet overlays for price trends per region</p>
                <p className="text-sm text-slate-500">Bilingual labels via `src/config/i18n.ts`.</p>
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
          {filteredStations.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">No stations publish this fuel for the selected filters.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {filteredStations.map((station) => {
                const price = station.fuels?.[selectedFuel]?.price
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
                      <p className="text-sm text-slate-500">{station.brand} · {station.province}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-accent">{price ? price.toFixed(2) : '—'}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">THB/L</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App
