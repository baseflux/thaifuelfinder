export type FuelKey = 'gasohol95' | 'e20' | 'e85' | 'b7' | 'premium'

export interface FuelPrice {
  price: number
  lastUpdated: number
}

export const FUEL_LABELS: Record<FuelKey, { en: string; th: string }> = {
  gasohol95: { en: 'Gasohol 95', th: 'แก๊สโซฮอล์ 95' },
  e20: { en: 'Gasohol E20', th: 'แก๊สโซฮอล์ E20' },
  e85: { en: 'Gasohol E85', th: 'แก๊สโซฮอล์ E85' },
  b7: { en: 'Diesel B7', th: 'ดีเซล B7' },
  premium: { en: 'Premium Diesel', th: 'ดีเซลพรีเมียม' }
}
