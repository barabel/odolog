import type { ComponentType } from 'react';

import type { TSheetKey, TSheetProps } from './index';

type TSheetComponentProps<K extends TSheetKey> = TSheetProps<K> extends undefined
  ? { close: () => void }
  : TSheetProps<K> & { close: () => void };

export type TSheetRegistry = {
  [K in TSheetKey]: ComponentType<TSheetComponentProps<K>>;
};
