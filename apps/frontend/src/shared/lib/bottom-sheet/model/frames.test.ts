import { describe, expect, it } from 'vitest';

import { closeAllFrames, closeFrameById, closeTopFrame, pushFrame, removeFrame } from './frames';
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

  it('ignores a duplicate key when the top open frame has the same key', () => {
    const existing = [makeFrame({ id: 'frame-1', key: 'odometer', open: true })];
    const duplicate = makeFrame({ id: 'frame-2', key: 'odometer' });

    expect(pushFrame(existing, duplicate)).toEqual(existing);
  });

  it('adds a duplicate key when allowDuplicate is true', () => {
    const existing = [makeFrame({ id: 'frame-1', key: 'odometer', open: true })];
    const duplicate = makeFrame({ id: 'frame-2', key: 'odometer' });

    expect(pushFrame(existing, duplicate, true)).toEqual([...existing, duplicate]);
  });

  it('adds a frame when the top open frame with the same key is already closing', () => {
    const existing = [makeFrame({ id: 'frame-1', key: 'odometer', open: false })];
    const next = makeFrame({ id: 'frame-2', key: 'odometer' });

    expect(pushFrame(existing, next)).toEqual([...existing, next]);
  });

  it('adds a frame when the same key exists in the middle of the stack but not on top', () => {
    const existing = [
      makeFrame({ id: 'frame-1', key: 'odometer', open: true }),
      makeFrame({ id: 'frame-2', key: 'fuel', open: true }),
    ];
    const next = makeFrame({ id: 'frame-3', key: 'odometer' });

    expect(pushFrame(existing, next)).toEqual([...existing, next]);
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

describe('closeFrameById', () => {
  it('closes the frame matching the given id among several open frames', () => {
    const frames = [
      makeFrame({ id: 'frame-1', open: true }),
      makeFrame({ id: 'frame-2', open: true }),
    ];

    expect(closeFrameById(frames, 'frame-1')).toEqual([
      makeFrame({ id: 'frame-1', open: false }),
      makeFrame({ id: 'frame-2', open: true }),
    ]);
  });

  it('returns the stack unchanged for an unknown id', () => {
    const frames = [makeFrame({ id: 'frame-1', open: true })];

    expect(closeFrameById(frames, 'unknown')).toEqual(frames);
  });

  it('does not mutate the input array', () => {
    const frames = [makeFrame({ id: 'frame-1', open: true })];

    closeFrameById(frames, 'frame-1');

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

describe('closeAllFrames', () => {
  it('returns an empty stack', () => {
    const frames = [makeFrame({ id: 'frame-1' }), makeFrame({ id: 'frame-2' })];

    expect(closeAllFrames(frames)).toEqual([]);
  });

  it('does not mutate the input array', () => {
    const frames = [makeFrame({ id: 'frame-1' })];

    closeAllFrames(frames);

    expect(frames).toEqual([makeFrame({ id: 'frame-1' })]);
  });
});
