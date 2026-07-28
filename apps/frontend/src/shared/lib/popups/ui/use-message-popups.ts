import { useTranslation } from 'react-i18next';

import { usePopups } from './use-popups';

export const useErrorPopup = () => {
  const { openPopup } = usePopups();
  const { t } = useTranslation();

  const showError = () => {
    openPopup('message', {
      title: t('popups.message.error.title'),
      description: t('popups.message.error.description'),
    });
  };

  return { showError };
};
