import { describe, expect, it } from 'vitest';

import { formatNumber, parseDecimal } from '@/shared/lib/number';

describe('parseDecimal', () => {
  it('parses an integer', () => {
    expect(parseDecimal('123')).toBe(123);
  });

  it('parses a decimal with a dot', () => {
    expect(parseDecimal('45.37')).toBe(45.37);
  });

  it('parses a decimal with a comma', () => {
    expect(parseDecimal('45,37')).toBe(45.37);
  });

  it('parses an arbitrary fractional length', () => {
    expect(parseDecimal('1,23456')).toBe(1.23456);
  });

  it('parses zero', () => {
    expect(parseDecimal('0')).toBe(0);
  });

  it('rejects an empty string', () => {
    expect(parseDecimal('')).toBe(null);
  });

  it('rejects letters and garbage', () => {
    expect(parseDecimal('abc')).toBe(null);
    expect(parseDecimal('12abc')).toBe(null);
  });

  it('rejects a dangling separator', () => {
    expect(parseDecimal('45,')).toBe(null);
    expect(parseDecimal('45.')).toBe(null);
  });

  it('rejects multiple separators', () => {
    expect(parseDecimal('4,5,6')).toBe(null);
    expect(parseDecimal('4.5.6')).toBe(null);
  });
});

describe('formatNumber', () => {
  const nbsp = ' ';

  it('drops trailing zeros on a whole number', () => {
    expect(formatNumber(70)).toBe('70');
  });

  it('keeps up to two fraction digits', () => {
    expect(formatNumber(66.67)).toBe('66,67');
  });

  it('rounds the third fraction digit', () => {
    expect(formatNumber(66.666)).toBe('66,67');
  });

  it('uses a localized decimal separator', () => {
    expect(formatNumber(70.5)).toBe('70,5');
  });

  it('groups thousands with a localized separator', () => {
    expect(formatNumber(1234567.5)).toBe(`1${nbsp}234${nbsp}567,5`);
  });
});
