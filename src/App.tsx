import type { Station } from './types/station'
import { MapView } from './components/map/MapView'

const featuredStations: Station[] = [
  {
    id: 'S001',
    name: 'PTT Coastal Chonburi',
    province: 'Chonburi',
    district: 'Sriracha',
    lat: 13.152,
    lng: 100.93,
    fuels: { gasohol95: { price: 42.3, lastUpdated: 1732506000 } },
    flags: 0
  },
  {
    id: 'S014',
    name: 'Bangchak Rama IX',
    province: 'Bangkok',
    district: 'Huai Khwang',
    lat: 13.751,
    lng: 100.578,
    fuels: { gasohol95: { price: 41.8, lastUpdated: 1732506000 } },
    flags: 1
  },
  {
    id: 'S022',
    name: 'Caltex Mae Rim',
    province: 'Chiang Mai',
    district: 'Mae Rim',
    lat: 18.938,
    lng: 98.945,
    fuels: { gasohol95: { price: 40.9, lastUpdated: 1732506000 } },
    flags: 0
  }
]

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
          <MapView stations={featuredStations} />
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
          <h3 className="text-lg font-semibold text-slate-900">Featured stations</h3>
          <p className="text-sm text-slate-500">Mock data rendered from `seedStations.json`.</p>
          <ul className="mt-4 space-y-3">
            {featuredStations.map((station) => (
              <li key={station.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{station.name}</p>
                  <p className="text-sm text-slate-500">{station.province}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-accent">
                    {(station.fuels.gasohol95?.price ?? 0).toFixed(2)}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">THB/L</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}

export default App
