import i18n from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { IconsArray } from '@/shared/enums/icons';
import { Tabbar, type TTabbar } from '@/widgets/tabbar';
import { useActiveVehicleStore, useSyncActiveVehicle } from '@/entities/vehicle';
import cx from 'classix';
import { Navigate, Outlet, useParams } from 'react-router';

export const LayoutIndex: FCClass = ({
  className,
}) => {
  const { vehicleId: paramVehicleId } = useParams<{ vehicleId: string }>();
  const activeVehicleId = useActiveVehicleStore((state) => {
    return state.activeVehicleId;
  });

  useSyncActiveVehicle();

  const vehicleId = paramVehicleId ?? activeVehicleId;

  if (!vehicleId) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const tabbarItems: TTabbar['items'] = [
    {
      icon: IconsArray.list,
      title: i18n.t('tabbar.list'),
      path: ROUTES.list(vehicleId),
      end: true,
    },
    {
      icon: IconsArray.analytics,
      title: i18n.t('tabbar.analytics'),
      path: ROUTES.analytics(vehicleId),
      iconType: 'stroke',
    },
    {
      icon: IconsArray.settings,
      title: i18n.t('tabbar.settings'),
      path: ROUTES.settings,
      iconType: 'stroke',
    },
  ];

  return (
    <main
      className={cx(
        'main',
        'relative h-svh pb-96 border-x-1 border-gray-100',
        className,
      )}
    >
      <div
        className="h-full overflow-auto"
      >
        <Outlet />
      </div>

      <Tabbar
        className="z-20 absolute bottom-0 w-full bg-white-100 h-96"
        items={tabbarItems}
      />
    </main>
  );
};
