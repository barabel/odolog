import { describe, expect, it } from 'vitest';

import { buildFuelEntry } from './build-fuel-entry';

describe('buildFuelEntry', () => {
  const input = {
    vehicleId: 'AbC123',
    measuredAt: 1_700_000_000_000,
    odometer: 123456,
    liters: 42.37,
    totalCost: 3000,
    now: 1_700_000_500_000,
  };

  it('carries user fields over unchanged', () => {
    const entry = buildFuelEntry(input);

    expect(entry.vehicleId).toBe(input.vehicleId);
    expect(entry.measuredAt).toBe(input.measuredAt);
    expect(entry.odometer).toBe(input.odometer);
    expect(entry.liters).toBe(input.liters);
    expect(entry.totalCost).toBe(input.totalCost);
  });

  it('is a fuel entry', () => {
    expect(buildFuelEntry(input).type).toBe('fuel');
  });

  it('sets createdAt and updatedAt to the passed now', () => {
    const entry = buildFuelEntry(input);

    expect(entry.createdAt).toBe(input.now);
    expect(entry.updatedAt).toBe(input.now);
  });

  it('is unsynced and not deleted', () => {
    const entry = buildFuelEntry(input);

    expect(entry.synced).toBe(false);
    expect(entry.deletedAt).toBe(null);
  });

  it('gives each entry a fresh 21-char id', () => {
    const first = buildFuelEntry(input);
    const second = buildFuelEntry(input);

    expect(first.id).toHaveLength(21);
    expect(first.id).not.toBe(second.id);
  });
});
