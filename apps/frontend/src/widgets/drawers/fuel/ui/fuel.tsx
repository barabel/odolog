import type { DrawerComponent } from '@/shared/lib/drawer';
import { useTranslation } from 'react-i18next';

export const DrawerFuel: DrawerComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        {t('drawers.fuel.title')}
      </div>
    </div>
  );
};
