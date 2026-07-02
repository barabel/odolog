import { describe, it, expect } from 'vitest';
import { drawerStackReducer } from './reducer';
import type { Frame } from '../types';

const frame = (id: string, open = true): Frame => ({
  id,
  key: 'sheet-1',
  open,
});

describe('drawerStackReducer', () => {
  it('open pushes a frame with open:true onto the stack', () => {
    const next = drawerStackReducer([], { type: 'open', frame: frame('a') });

    expect(next).toEqual([{ id: 'a', key: 'sheet-1', open: true }]);
  });

  it('open after a filled stack nests (depth grows, order preserved)', () => {
    const state = [frame('a')];

    const next = drawerStackReducer(state, { type: 'open', frame: frame('b') });

    expect(next.map(f => f.id)).toEqual(['a', 'b']);
    expect(next.every(f => f.open)).toBe(true);
  });

  it('close flips only the top frame to open:false without removing it', () => {
    const state = [frame('a'), frame('b')];

    const next = drawerStackReducer(state, { type: 'close' });

    expect(next).toHaveLength(2);
    expect(next[0].open).toBe(true);
    expect(next[1].open).toBe(false);
  });

  it('close on an empty stack is a no-op', () => {
    expect(drawerStackReducer([], { type: 'close' })).toEqual([]);
  });

  it('close targets the last still-open frame, skipping a closing top', () => {
    const state = [frame('a'), frame('b', false)];

    const next = drawerStackReducer(state, { type: 'close' });

    expect(next[0].open).toBe(false);
    expect(next[1].open).toBe(false);
  });

  it('close with all frames already closing is a no-op', () => {
    const state = [frame('a', false), frame('b', false)];

    const next = drawerStackReducer(state, { type: 'close' });

    expect(next).toEqual(state);
  });

  it('remove drops the frame with the matching id', () => {
    const state = [frame('a'), frame('b', false)];

    const next = drawerStackReducer(state, { type: 'remove', id: 'b' });

    expect(next.map(f => f.id)).toEqual(['a']);
  });

  it('two opens of the same key produce two distinct frames addressable by id', () => {
    let state = drawerStackReducer([], { type: 'open', frame: frame('a') });
    state = drawerStackReducer(state, { type: 'open', frame: frame('b') });

    expect(state.map(f => f.id)).toEqual(['a', 'b']);
    expect(state[0].key).toBe(state[1].key);
  });

  it('closeAll flips open:false on every frame without removing any', () => {
    const state = [frame('a'), frame('b'), frame('c')];

    const next = drawerStackReducer(state, { type: 'closeAll' });

    expect(next.map(f => f.id)).toEqual(['a', 'b', 'c']);
    expect(next.every(f => f.open === false)).toBe(true);
  });
});
