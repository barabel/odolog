import { useTranslation } from 'react-i18next';

export const BottomSheetFuel: FCClass = () => {
  const { t } = useTranslation();

  return (
    <div
      className="p-20"
    >
      <div>
        {t('bottomSheets.fuel.title')}
      </div>
    </div>
  );
};
