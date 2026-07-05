import type { DrawerComponent } from '@/shared/lib/drawer';
import { useTranslation } from 'react-i18next';

export const DrawerOdometer: DrawerComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        {t('drawers.odometer.title')}
      </div>
    </div>
  );
};
