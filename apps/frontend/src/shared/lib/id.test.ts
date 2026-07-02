import { describe, expect, it } from 'vitest';

import { genId, genVehicleId } from '@/shared/lib/id';

describe('id generators', () => {
  it('genId returns default 21-char id', () => {
    expect(genId()).toHaveLength(21);
  });

  it('genId honors requested size', () => {
    expect(genId(6)).toHaveLength(6);
  });

  it('genVehicleId returns 6-char id from the url-safe alphabet', () => {
    expect(genVehicleId()).toMatch(/^[23456789A-HJ-NP-Za-km-z]{6}$/);
  });
});
