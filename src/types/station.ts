import type { FuelKey, FuelPrice } from './fuels'

export interface WeeklyHistoryPoint {
  week: string
  avg: number
}

export type StationHistory = Partial<Record<FuelKey, WeeklyHistoryPoint[]>>

export interface Station {
  id: string
  name: string
  brand?: string
  province: string
  district: string
  lat: number
  lng: number
  fuels: Partial<Record<FuelKey, FuelPrice>>
  flags: number
  suspicionScore?: number
  history?: StationHistory
}
