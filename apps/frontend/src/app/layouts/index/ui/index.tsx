import i18n from '@/i18n';
import { ROUTES_PATHS } from '@/shared/config/routes';
import { IconsArray } from '@/shared/enums/icons';
import { Tabbar, type TTabbar } from '@/widgets/tabbar';
import cx from 'classix';
import { Outlet } from 'react-router';

const tabbarItems: TTabbar['items'] = [
  {
    icon: IconsArray.list,
    title: i18n.t('tabbar.list'),
    path: ROUTES_PATHS.LIST,
  },
  {
    icon: IconsArray.analytics,
    title: i18n.t('tabbar.analytics'),
    path: ROUTES_PATHS.ANALYTICS,
    iconType: 'stroke',
  },
  {
    icon: IconsArray.settings,
    title: i18n.t('tabbar.settings'),
    path: ROUTES_PATHS.SETTINGS,
    iconType: 'stroke',
  },
];

export const LayoutIndex: FCClass = ({
  className,
}) => {
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
