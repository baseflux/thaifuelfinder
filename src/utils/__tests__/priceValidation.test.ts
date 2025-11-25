import { describe, expect, it } from 'vitest'
import { validatePrice } from '../priceValidation'

describe('validatePrice', () => {
  it('rejects NaN', () => {
    expect(validatePrice('gasohol95', Number.NaN).level).toBe('reject')
  })

  it('rejects zero or negative', () => {
    expect(validatePrice('gasohol95', 0).level).toBe('reject')
    expect(validatePrice('e20', -5).level).toBe('reject')
  })

  it('rejects outside hard bounds', () => {
    expect(validatePrice('premium', 5).level).toBe('reject')
    expect(validatePrice('premium', 200).level).toBe('reject')
  })

  it('accepts normal prices', () => {
    expect(validatePrice('b7', 33).level).toBe('ok')
  })

  it('warns outside soft range', () => {
    expect(validatePrice('gasohol95', 50).level).toBe('warn')
  })

  it('warns on large delta', () => {
    expect(
      validatePrice('e20', 40, { currentPrice: 30, maxDeltaFraction: 0.3 }).level
    ).toBe('warn')
  })

  it('rejects huge delta', () => {
    expect(
      validatePrice('e20', 50, { currentPrice: 30, maxDeltaFraction: 0.3 }).level
    ).toBe('reject')
  })
})
