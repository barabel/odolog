import type { TPopupKey, TPopupProps } from './index';

export type TPopupsRegistry = {
  [K in TPopupKey]: FCPopup<TPopupProps<K> extends undefined ? object : TPopupProps<K>>;
};
