import type { FuelKey } from '../types/fuels'

export type ValidationLevel = 'ok' | 'warn' | 'reject'
export type ValidationCode =
  | 'OK'
  | 'NOT_FINITE'
  | 'NEGATIVE_OR_ZERO'
  | 'OUTSIDE_HARD_BOUNDS'
  | 'OUTSIDE_SOFT_RANGE'
  | 'DELTA_TOO_LARGE'

export interface PriceValidationResult {
  level: ValidationLevel
  code: ValidationCode
  message: string
}

const PRICE_LIMITS: Record<
  FuelKey,
  { softMin: number; softMax: number; hardMin: number; hardMax: number }
> = {
  gasohol95: { softMin: 30, softMax: 45, hardMin: 20, hardMax: 60 },
  e20: { softMin: 28, softMax: 42, hardMin: 18, hardMax: 55 },
  e85: { softMin: 27, softMax: 40, hardMin: 18, hardMax: 55 },
  b7: { softMin: 28, softMax: 40, hardMin: 18, hardMax: 55 },
  premium: { softMin: 40, softMax: 55, hardMin: 25, hardMax: 70 }
}

export function validatePrice(
  fuel: FuelKey,
  price: number,
  options: { currentPrice?: number | null; maxDeltaFraction?: number } = {}
): PriceValidationResult {
  const limits = PRICE_LIMITS[fuel]
  const { currentPrice, maxDeltaFraction = 0.3 } = options

  if (!Number.isFinite(price)) {
    return { level: 'reject', code: 'NOT_FINITE', message: 'Price must be finite.' }
  }

  if (price <= 0) {
    return { level: 'reject', code: 'NEGATIVE_OR_ZERO', message: 'Price must be > 0.' }
  }

  if (price < limits.hardMin || price > limits.hardMax) {
    return {
      level: 'reject',
      code: 'OUTSIDE_HARD_BOUNDS',
      message: `This price looks impossible for ${fuel}.`
    }
  }

  if (currentPrice && currentPrice > 0) {
    const delta = Math.abs(price - currentPrice)
    const frac = delta / currentPrice

    if (frac > 2 * maxDeltaFraction) {
      return {
        level: 'reject',
        code: 'DELTA_TOO_LARGE',
        message: 'Price too far from current value.'
      }
    }

    if (frac > maxDeltaFraction) {
      return {
        level: 'warn',
        code: 'DELTA_TOO_LARGE',
        message: 'Large change from previous price.'
      }
    }
  }

  if (price < limits.softMin || price > limits.softMax) {
    return {
      level: 'warn',
      code: 'OUTSIDE_SOFT_RANGE',
      message: `Unusual price for ${fuel} in Thailand.`
    }
  }

  return { level: 'ok', code: 'OK', message: 'Price looks reasonable.' }
}
