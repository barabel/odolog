import { describe, it, expect } from 'vitest';
import { mergeDrawerOptions } from './merge-options';
import type { DrawerOptions } from '../types';

describe('mergeDrawerOptions', () => {
  it('returns registry defaults when no override is given', () => {
    const base: DrawerOptions = { dismissible: false };

    expect(mergeDrawerOptions(base)).toEqual({ dismissible: false });
  });

  it('override keys win over registry defaults', () => {
    const base: DrawerOptions = { dismissible: false };
    const override: DrawerOptions = { dismissible: true };

    expect(mergeDrawerOptions(base, override)).toEqual({ dismissible: true });
  });

  it('merges shallow: unspecified override keys fall back to registry', () => {
    const base: DrawerOptions = { dismissible: false, modal: true };
    const override: DrawerOptions = { dismissible: true };

    expect(mergeDrawerOptions(base, override)).toEqual({
      dismissible: true,
      modal: true,
    });
  });

  it('returns an empty object when neither is given', () => {
    expect(mergeDrawerOptions()).toEqual({});
  });
});
