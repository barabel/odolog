import { usePopupsEngineProvider } from '@idem.agency/popups-engine';

import type { TPopupKey, TPopupProps } from '../types';

type TOpenPopupArgs<K extends TPopupKey> = TPopupProps<K> extends undefined
  ? [key: K, props?: TPopupProps<K>]
  : [key: K, props: TPopupProps<K>];

export const usePopups = () => {
  const { openPopup: openPopupEngine, closePopup } = usePopupsEngineProvider();

  const openPopup = <K extends TPopupKey>(...args: TOpenPopupArgs<K>) => {
    const [key, props] = args;

    openPopupEngine({
      variant: key,
      popupProps: props,
    });
  };

  return { openPopup, closePopup };
};
