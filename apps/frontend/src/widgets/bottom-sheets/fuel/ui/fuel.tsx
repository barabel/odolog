import { useTranslation } from 'react-i18next';

type TBottomSheetFuel = {
  close: () => void;
};

export const BottomSheetFuel: FCClass<TBottomSheetFuel> = () => {
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
