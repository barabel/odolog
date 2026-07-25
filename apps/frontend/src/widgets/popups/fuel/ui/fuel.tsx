import { useTranslation } from 'react-i18next';

type TPopupFuel = {
  closePopup: () => void;
};

export const PopupFuel: FCClass<TPopupFuel> = () => {
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
