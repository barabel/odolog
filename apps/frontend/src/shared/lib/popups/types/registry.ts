import type { ComponentType } from 'react';

import type { TPopupKey, TPopupProps } from './index';

type TPopupComponentProps<K extends TPopupKey> = TPopupProps<K> extends undefined
  ? { closePopup: () => void }
  : TPopupProps<K> & { closePopup: () => void };

export type TPopupsRegistry = {
  [K in TPopupKey]: ComponentType<TPopupComponentProps<K>>;
};
