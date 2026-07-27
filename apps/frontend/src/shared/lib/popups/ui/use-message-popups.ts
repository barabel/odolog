import { useTranslation } from 'react-i18next';

import { usePopups } from './use-popups';

export const useSuccessPopup = () => {
  const { openPopup } = usePopups();
  const { t } = useTranslation();

  const showSuccess = () => {
    openPopup('message', {
      title: t('popups.message.success.title'),
    }, {
      closeAll: true,
    });
  };

  return { showSuccess };
};

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
