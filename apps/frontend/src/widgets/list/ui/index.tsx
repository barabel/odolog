import cx from 'classix';
import { useTranslation } from 'react-i18next';
import type { TList } from '../types';
import { FabButton } from '@/shared/ui/fab-button';
import { IconsArray } from '@/shared/enums/icons';

export const List: FCClass<TList> = ({
  className,
  vehicleName,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cx(
        'flex flex-col p-16',
        className,
      )}
    >
      {vehicleName && (
        <div
          className=""
        >
          {vehicleName}
        </div>
      )}

      <FabButton
        className="mt-auto"
        items={[
          {
            title: t('list.fab.odometer'),
            value: '1',
            icon: IconsArray.odometer,
            iconClassName: 'bg-blue-100 fill-blue-200',
          },
          {
            title: t('list.fab.fuel'),
            value: '2',
            icon: IconsArray.fuel,
            iconClassName: 'bg-green-100 fill-green-200',
          },
        ]}
        onFabItemClick={(value) => {
          console.log('value', value);
        }}
      />
    </div>
  );
};
