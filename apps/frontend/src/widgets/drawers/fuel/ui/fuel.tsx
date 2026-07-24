import { useTranslation } from 'react-i18next';

export const DrawerFuel: FCClass = () => {
  const { t } = useTranslation();

  return (
    <div
      className="p-20"
    >
      <div>
        {t('drawers.fuel.title')}
      </div>
    </div>
  );
};
