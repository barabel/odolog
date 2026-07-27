import cx from 'classix';
import { useTranslation } from 'react-i18next';

export const PopupFuel: FCPopup = () => {
  const { t } = useTranslation();

  return (
    <div
      className="p-20"
    >
      <div
        className={cx(
          't1',
        )}
      >
        {t('popups.fuel.title')}
      </div>
    </div>
  );
};
