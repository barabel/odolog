import { usePopupsEngineProvider } from '@idem.agency/popups-engine';

import type { TPopupKey, TPopupProps } from '../types';

type TOpenPopupOptions = {
  /** закрыть всю стопку попапов при закрытии этого попапа */
  closeAll?: boolean;
};

type TOpenPopupArgs<K extends TPopupKey> = TPopupProps<K> extends undefined
  ? [key: K, props?: TPopupProps<K>, options?: TOpenPopupOptions]
  : [key: K, props: TPopupProps<K>, options?: TOpenPopupOptions];

export const usePopups = () => {
  const { openPopup: openPopupEngine, closePopup } = usePopupsEngineProvider();

  const openPopup = <K extends TPopupKey>(...args: TOpenPopupArgs<K>) => {
    const [key, props, options] = args;

    openPopupEngine({
      variant: key,
      popupProps: props,
      isCloseAll: options?.closeAll,
    });
  };

  return { openPopup, closePopup };
};
