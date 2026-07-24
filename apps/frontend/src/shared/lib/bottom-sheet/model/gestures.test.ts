import { describe, expect, it } from 'vitest';

import { shouldDismissSheet } from './gestures';

describe('shouldDismissSheet', () => {
  it('returns false when offset and velocity are below thresholds', () => {
    expect(shouldDismissSheet(20, 50)).toBe(false);
  });

  it('returns true when offset reaches the threshold', () => {
    expect(shouldDismissSheet(100, 0)).toBe(true);
  });

  it('returns true when velocity reaches the threshold, even with small offset', () => {
    expect(shouldDismissSheet(10, 500)).toBe(true);
  });

  it('returns false for an upward drag regardless of speed', () => {
    expect(shouldDismissSheet(-20, -900)).toBe(false);
  });
});
