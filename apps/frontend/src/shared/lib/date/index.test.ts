import { describe, expect, it } from 'vitest';

import { combineDateAndTime } from '@/shared/lib/date';

describe('combineDateAndTime', () => {
  it('takes date from the first argument and time from the second', () => {
    const date = new Date(2026, 6, 26, 3, 3, 3, 3);
    const time = new Date(2000, 0, 1, 14, 37);

    const result = combineDateAndTime(date, time);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(26);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(37);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('handles the last day of a month', () => {
    const date = new Date(2026, 0, 31);
    const time = new Date(2000, 0, 1, 23, 0);

    const result = combineDateAndTime(date, time);

    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(0);
  });

  it('handles the last day of a year', () => {
    const date = new Date(2026, 11, 31);
    const time = new Date(2000, 0, 1, 23, 59);

    const result = combineDateAndTime(date, time);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
  });

  it('handles a daylight-saving-time transition date without shifting the day', () => {
    const date = new Date(2026, 2, 29);
    const time = new Date(2000, 0, 1, 2, 30);

    const result = combineDateAndTime(date, time);

    expect(result.getMonth()).toBe(2);
    expect(result.getDate()).toBe(29);
    expect(result.getHours()).toBe(2);
    expect(result.getMinutes()).toBe(30);
  });

  it('handles midnight', () => {
    const date = new Date(2026, 6, 26);
    const time = new Date(2000, 0, 1, 0, 0);

    const result = combineDateAndTime(date, time);

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it('handles 23:59', () => {
    const date = new Date(2026, 6, 26);
    const time = new Date(2000, 0, 1, 23, 59);

    const result = combineDateAndTime(date, time);

    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
  });
});
