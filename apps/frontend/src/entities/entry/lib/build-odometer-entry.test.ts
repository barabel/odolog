import { describe, expect, it } from 'vitest';

import { buildOdometerEntry } from './build-odometer-entry';

describe('buildOdometerEntry', () => {
  const input = {
    vehicleId: 'AbC123',
    measuredAt: 1_700_000_000_000,
    odometer: 123456,
    now: 1_700_000_500_000,
  };

  it('carries user fields over unchanged', () => {
    const entry = buildOdometerEntry(input);

    expect(entry.vehicleId).toBe(input.vehicleId);
    expect(entry.measuredAt).toBe(input.measuredAt);
    expect(entry.odometer).toBe(input.odometer);
  });

  it('is an odometer entry', () => {
    expect(buildOdometerEntry(input).type).toBe('odometer');
  });

  it('sets createdAt and updatedAt to the passed now', () => {
    const entry = buildOdometerEntry(input);

    expect(entry.createdAt).toBe(input.now);
    expect(entry.updatedAt).toBe(input.now);
  });

  it('is unsynced and not deleted', () => {
    const entry = buildOdometerEntry(input);

    expect(entry.synced).toBe(false);
    expect(entry.deletedAt).toBe(null);
  });

  it('gives each entry a fresh 21-char id', () => {
    const first = buildOdometerEntry(input);
    const second = buildOdometerEntry(input);

    expect(first.id).toHaveLength(21);
    expect(first.id).not.toBe(second.id);
  });
});
