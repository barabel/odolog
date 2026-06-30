import cx from 'classix';
import { useTranslation } from 'react-i18next';
import type { TList } from '../types';
import { FabButton } from '@/shared/ui/fab-button';
import { IconsArray } from '@/shared/enums/icons';
import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import { ListStub } from './stub';

type TGetEntryTextParams = {
  t: (string: string) => string;
} & Pick<TList, 'odometerEntries' | 'fuelEntries'>;

const getEntryText = (params: TGetEntryTextParams) => {
  const {
    t,
    fuelEntries,
    odometerEntries,
  } = params;

  const hasOdometerEntries = isArrayAndNotEmpty(odometerEntries);
  const hasFuelEntries = isArrayAndNotEmpty(fuelEntries);

  const noEntries = !hasOdometerEntries && !hasFuelEntries;

  if (noEntries) {
    return t('list.entry.none');
  };

  // TODO: сделать когда отрефакторю идею
  // let odometerLastDate = '';
  // if (hasOdometerEntries) {
  //   const nonDeletedOdomenterEntries = odometerEntries.filter(entry => typeof entry.deletedAt === 'number');
  //   const lastOdometerEntry = nonDeletedOdomenterEntries.reduce((a, b) => (a.odometer > b.odometer) ? a : b);

  //   odometerLastDate = lastOdometerEntry.date;
  // }

  // let fuelLastDate = '';
  // if (hasFuelEntries) {
  //   const nonDeletedFuelEntries = fuelEntries.filter(entry => typeof entry.deletedAt === 'number');
  //   const lastFuelEntry = nonDeletedFuelEntries.reduce((a, b) => (a.odometer > b.odometer ? a : b));

  //   fuelLastDate = lastFuelEntry.date;
  // }

  return '';
};

export const List: FCClass<TList> = ({
  className,
  vehicleName,
  odometerEntries,
  fuelEntries,
}) => {
  const { t } = useTranslation();

  const hasOdometerEntries = isArrayAndNotEmpty(odometerEntries);
  const hasFuelEntries = isArrayAndNotEmpty(fuelEntries);

  const noEntries = !hasOdometerEntries && !hasFuelEntries;

  return (
    <div
      className={cx(
        'flex flex-col p-16',
        className,
      )}
    >
      <div>
        {vehicleName && (
          <div
            className="h4"
          >
            {vehicleName}
          </div>
        )}

        <div
          className="text-black-200  t2"
        >
          {getEntryText({ t, fuelEntries, odometerEntries })}
        </div>
      </div>

      {noEntries && (
        <ListStub />
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
