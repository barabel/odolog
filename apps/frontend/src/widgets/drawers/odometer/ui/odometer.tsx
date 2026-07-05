import type { DrawerComponent } from '@/shared/lib/drawer';
import { useTranslation } from 'react-i18next';

export const DrawerOdometer: DrawerComponent = () => {
  const { t } = useTranslation();

  return (
    <div
      className="p-20"
    >
      <div
        className="mb-20"
      >
        {t('drawers.odometer.title')}
      </div>

      <form>
        <label
          className="flex flex-col gap-4 w-full"
        >
          <div>
            {t('drawers.odometer.inputValue.label')}
          </div>

          <div
            className="grow-1 relative"
          >
            <input
              className="flex w-full h-40 pl-20 pr-45 border-1 border-black-100 rounded-xl"
            />

            <div
              className="absolute top-1/2 right-20 -translate-y-1/2"
            >
              {t('drawers.odometer.inputValue.unit')}
            </div>
          </div>
        </label>
      </form>
    </div>
  );
};
