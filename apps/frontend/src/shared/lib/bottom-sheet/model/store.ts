import { create } from 'zustand';

import {
  closeAllFrames,
  closeFrameById,
  closeTopFrame,
  pushFrame,
  removeFrame,
  type TSheetFrame,
} from './frames';
import { genId } from '@/shared/lib/id';
import type { TSheetKey, TSheetProps } from '../types';

type TSheetStore = {
  frames: TSheetFrame[];
};

export const useSheetStore = create<TSheetStore>(() => ({
  frames: [],
}));

type TOpenSheetArgs<K extends TSheetKey> = TSheetProps<K> extends undefined
  ? [key: K, props?: TSheetProps<K>, options?: TOpenSheetOptions]
  : [key: K, props: TSheetProps<K>, options?: TOpenSheetOptions];

type TOpenSheetOptions = {
  allowDuplicate?: boolean;
};

export const openSheet = <K extends TSheetKey>(...args: TOpenSheetArgs<K>) => {
  const [key, props, options] = args;

  const { frames } = useSheetStore.getState();

  const frame: TSheetFrame = {
    id: genId(),
    key,
    props,
    open: true,
  };

  useSheetStore.setState({ frames: pushFrame(frames, frame, options?.allowDuplicate) });
};

export const closeSheet = () => {
  const { frames } = useSheetStore.getState();

  useSheetStore.setState({ frames: closeTopFrame(frames) });
};

export const closeSheetById = (id: string) => {
  const { frames } = useSheetStore.getState();

  useSheetStore.setState({ frames: closeFrameById(frames, id) });
};

export const closeAllSheets = () => {
  const { frames } = useSheetStore.getState();

  useSheetStore.setState({ frames: closeAllFrames(frames) });
};

export const removeSheetFrame = (id: string) => {
  const { frames } = useSheetStore.getState();

  useSheetStore.setState({ frames: removeFrame(frames, id) });
};
