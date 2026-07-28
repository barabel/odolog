import { describe, expect, it } from 'vitest';

import { pricePerLiter } from './price-per-liter';

describe('pricePerLiter', () => {
  it('divides cost by liters', () => {
    expect(pricePerLiter(3000, 42)).toBeCloseTo(71.4285, 3);
  });

  it('returns an even result for an even division', () => {
    expect(pricePerLiter(3500, 50)).toBe(70);
  });

  it('gives zero for a zero cost', () => {
    expect(pricePerLiter(0, 42)).toBe(0);
  });

  it('returns null for zero liters', () => {
    expect(pricePerLiter(3000, 0)).toBe(null);
  });

  it('returns null for negative liters', () => {
    expect(pricePerLiter(3000, -5)).toBe(null);
  });
});
