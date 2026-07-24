import { describe, expect, it } from 'vitest';

import { closeTopFrame, pushFrame, removeFrame } from './frames';
import type { TSheetFrame } from './frames';

const makeFrame = (overrides: Partial<TSheetFrame> = {}): TSheetFrame => ({
  id: 'frame-1',
  key: 'odometer',
  props: undefined,
  open: true,
  ...overrides,
});

describe('pushFrame', () => {
  it('adds the frame to the end of the stack', () => {
    const existing = [makeFrame({ id: 'frame-1' })];
    const added = makeFrame({ id: 'frame-2', key: 'fuel' });

    expect(pushFrame(existing, added)).toEqual([existing[0], added]);
  });

  it('does not mutate the input array', () => {
    const existing = [makeFrame({ id: 'frame-1' })];

    pushFrame(existing, makeFrame({ id: 'frame-2' }));

    expect(existing).toEqual([makeFrame({ id: 'frame-1' })]);
  });
});

describe('closeTopFrame', () => {
  it('closes the last open frame, not the last by index', () => {
    const frames = [
      makeFrame({ id: 'frame-1', open: false }),
      makeFrame({ id: 'frame-2', open: true }),
    ];

    expect(closeTopFrame(frames)).toEqual([
      makeFrame({ id: 'frame-1', open: false }),
      makeFrame({ id: 'frame-2', open: false }),
    ]);
  });

  it('returns the stack unchanged when empty', () => {
    expect(closeTopFrame([])).toEqual([]);
  });

  it('returns the stack unchanged when no frame is open', () => {
    const frames = [makeFrame({ id: 'frame-1', open: false })];

    expect(closeTopFrame(frames)).toEqual(frames);
  });

  it('does not mutate the input array', () => {
    const frames = [makeFrame({ id: 'frame-1', open: true })];

    closeTopFrame(frames);

    expect(frames).toEqual([makeFrame({ id: 'frame-1', open: true })]);
  });
});

describe('removeFrame', () => {
  it('removes the frame by id and keeps the order of the rest', () => {
    const frames = [
      makeFrame({ id: 'frame-1' }),
      makeFrame({ id: 'frame-2' }),
      makeFrame({ id: 'frame-3' }),
    ];

    expect(removeFrame(frames, 'frame-2')).toEqual([
      makeFrame({ id: 'frame-1' }),
      makeFrame({ id: 'frame-3' }),
    ]);
  });

  it('does not mutate the input array', () => {
    const frames = [makeFrame({ id: 'frame-1' }), makeFrame({ id: 'frame-2' })];

    removeFrame(frames, 'frame-1');

    expect(frames).toEqual([makeFrame({ id: 'frame-1' }), makeFrame({ id: 'frame-2' })]);
  });
});
