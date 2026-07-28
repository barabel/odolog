import { describe, expect, it } from 'vitest';

import { sortEntries } from './sort-entries';
import type { TOdometerEntry } from '@odolog/shared';

const makeEntry = (id: string, measuredAt: number, createdAt: number): TOdometerEntry => {
  return {
    id,
    type: 'odometer',
    vehicleId: 'AbC123',
    measuredAt,
    odometer: 1000,
    createdAt,
    updatedAt: createdAt,
    synced: false,
    deletedAt: null,
  };
};

describe('sortEntries', () => {
  it('puts the newest measuredAt first', () => {
    const entries = [
      makeEntry('old', 1_000, 1),
      makeEntry('new', 3_000, 1),
      makeEntry('mid', 2_000, 1),
    ];

    expect(sortEntries(entries).map(({ id }) => {
      return id;
    })).toEqual(['new', 'mid', 'old']);
  });

  it('breaks a measuredAt tie by createdAt, newest first', () => {
    const entries = [
      makeEntry('first', 1_000, 10),
      makeEntry('third', 1_000, 30),
      makeEntry('second', 1_000, 20),
    ];

    expect(sortEntries(entries).map(({ id }) => {
      return id;
    })).toEqual(['third', 'second', 'first']);
  });

  it('returns an empty array for an empty input', () => {
    expect(sortEntries([])).toEqual([]);
  });

  it('does not mutate the passed array', () => {
    const entries = [
      makeEntry('old', 1_000, 1),
      makeEntry('new', 3_000, 1),
    ];

    sortEntries(entries);

    expect(entries.map(({ id }) => {
      return id;
    })).toEqual(['old', 'new']);
  });
});
