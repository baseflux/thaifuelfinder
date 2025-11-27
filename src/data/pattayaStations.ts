import type { Station } from '../types/station'

export const pattayaStations: Station[] = [
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
      e85: { price: 36.0, lastUpdated: 1732506000 },
      b7: { price: 33.2, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'PTT-MOTORWAY7',
    name: 'PTT Motorway 7 Pattaya',
    brand: 'PTT',
    province: 'Chonburi',
    district: 'Bang Lamung',
    lat: 13.035,
    lng: 100.969,
    fuels: {
      gasohol95: { price: 42.3, lastUpdated: 1732506000 },
      e20: { price: 39.8, lastUpdated: 1732506000 },
      b7: { price: 33.4, lastUpdated: 1732506000 },
      premium: { price: 45.5, lastUpdated: 1732506000 }
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
    id: 'SHELL-JOMTIEN',
    name: 'Shell Jomtien Beach',
    brand: 'Shell',
    province: 'Chonburi',
    district: 'Jomtien',
    lat: 12.879,
    lng: 100.887,
    fuels: {
      gasohol95: { price: 42.5, lastUpdated: 1732506000 },
      e20: { price: 40.0, lastUpdated: 1732506000 },
      b7: { price: 33.5, lastUpdated: 1732506000 },
      premium: { price: 46.0, lastUpdated: 1732506000 }
    },
    flags: 0
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
    id: 'ESSO-RAYONG',
    name: 'Esso Rayong City',
    brand: 'Esso',
    province: 'Rayong',
    district: 'Mueang Rayong',
    lat: 12.68,
    lng: 101.24,
    fuels: {
      gasohol95: { price: 41.5, lastUpdated: 1732506000 },
      e20: { price: 38.8, lastUpdated: 1732506000 },
      b7: { price: 33.0, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'CALTEX-JOMTIEN',
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
    id: 'CALTEX-CHONBURI',
    name: 'Caltex Chonburi Bypass',
    brand: 'Caltex',
    province: 'Chonburi',
    district: 'Mueang Chonburi',
    lat: 13.333,
    lng: 100.951,
    fuels: {
      gasohol95: { price: 41.6, lastUpdated: 1732506000 },
      e20: { price: 39.1, lastUpdated: 1732506000 },
      premium: { price: 45.6, lastUpdated: 1732506000 }
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
    id: 'PTG-RAYONG',
    name: 'PTG Rayong East',
    brand: 'PTG',
    province: 'Rayong',
    district: 'Ban Chang',
    lat: 12.729,
    lng: 101.058,
    fuels: {
      gasohol95: { price: 41.2, lastUpdated: 1732506000 },
      e20: { price: 38.6, lastUpdated: 1732506000 },
      b7: { price: 33.0, lastUpdated: 1732506000 }
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
  },
  {
    id: 'SUSCO-PATTAYA-SOUTH',
    name: 'Susco Pattaya South',
    brand: 'Susco',
    province: 'Chonburi',
    district: 'Pattaya City',
    lat: 12.905,
    lng: 100.881,
    fuels: {
      gasohol95: { price: 41.6, lastUpdated: 1732506000 },
      e20: { price: 38.9, lastUpdated: 1732506000 },
      e85: { price: 35.7, lastUpdated: 1732506000 }
    },
    flags: 0
  },
  {
    id: 'PT-HUAHIN',
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
  }
]
