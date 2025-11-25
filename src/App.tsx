import type { Station } from './types/station'
import { MapView } from './components/map/MapView'

const majorStations: Station[] = [
  {
    id: 'S001',
    name: 'PTT Coastal Chonburi',
    province: 'Chonburi',
    district: 'Sriracha',
    lat: 13.152,
    lng: 100.93,
    fuels: {
      gasohol95: { price: 42.3, lastUpdated: 1732506000 },
      e20: { price: 39.8, lastUpdated: 1732506000 },
      e85: { price: 36.5, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'S014',
    name: 'Bangchak Rama IX',
    province: 'Bangkok',
    district: 'Huai Khwang',
    lat: 13.751,
    lng: 100.578,
    fuels: {
      gasohol95: { price: 41.8, lastUpdated: 1732506000 },
      e20: { price: 39.2, lastUpdated: 1732506000 },
      b7: { price: 33.9, lastUpdated: 1732506000 }
    },
    flags: 1
  },
  {
    id: 'S022',
    name: 'Caltex Mae Rim',
    province: 'Chiang Mai',
    district: 'Mae Rim',
    lat: 18.938,
    lng: 98.945,
    fuels: {
      gasohol95: { price: 40.9, lastUpdated: 1732506000 },
      premium: { price: 45.7, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'S035',
    name: 'Shell Srinakarin',
    province: 'Bangkok',
    district: 'Bang Na',
    lat: 13.672,
    lng: 100.647,
    fuels: {
      gasohol95: { price: 42.6, lastUpdated: 1732506000 },
      e20: { price: 39.9, lastUpdated: 1732506000 },
      b7: { price: 34.4, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'S041',
    name: 'Esso Krungthep Kreetha',
    province: 'Bangkok',
    district: 'Saphan Sung',
    lat: 13.758,
    lng: 100.688,
    fuels: {
      gasohol95: { price: 41.6, lastUpdated: 1732506000 },
      e85: { price: 36.2, lastUpdated: 1732506000 },
      premium: { price: 45.2, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'S053',
    name: 'PT Hua Hin Bypass',
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
    id: 'S067',
    name: 'Susco Phuket Town',
    province: 'Phuket',
    district: 'Mueang Phuket',
    lat: 7.889,
    lng: 98.391,
    fuels: {
      gasohol95: { price: 43.1, lastUpdated: 1732506000 },
      e20: { price: 40.1, lastUpdated: 1732506000 },
      b7: { price: 34.9, lastUpdated: 1732506000 }
    },
    flags: 0
  }
]

const formatFuelSticker = (station: Station) => {
  const fuels = Object.keys(station.fuels ?? {})
  return fuels.length ? fuels.join(' · ').toUpperCase() : 'FUEL DATA TBD'
}

function App() {
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
            <p className="text-sm uppercase tracking-wide">Status</p>
            <p className="text-3xl font-bold">Dev Server Ready</p>
            <p className="text-sm text-white/80">npm run dev → Vite + Tailwind</p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[3fr,2fr]">
        <section className="space-y-6">
          <MapView stations={majorStations} />
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
          <h3 className="text-lg font-semibold text-slate-900">Major fuel brands</h3>
          <p className="text-sm text-slate-500">Mock data rendered from `seedStations.json`.</p>
          <ul className="mt-4 space-y-3">
            {majorStations.map((station) => {
              const primaryFuel = Object.values(station.fuels ?? {})[0]
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
                      {primaryFuel ? primaryFuel.price.toFixed(2) : '—'}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">THB/L</p>
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
