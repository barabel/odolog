import { useTranslation } from 'react-i18next';

export const PopupFuel: FCPopup = () => {
  const { t } = useTranslation();

  return (
    <div
      className="p-20"
    >
      <div>
        {t('popups.fuel.title')}
      </div>
    </div>
  );
};
