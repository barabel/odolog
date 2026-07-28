import cx from 'classix';
import { useTranslation } from 'react-i18next';
import type { TList } from '../types';
import { FabButton, type TFabButton } from '@/shared/ui/fab-button';
import { IconsArray } from '@/shared/enums/icons';
import { ListStub } from './stub/stub';
import { FAB_ITEM_VALUE } from '../const';
import { usePopups } from '@/shared/lib/popups';
import { formatFullMoment } from '@/shared/lib/date';
import { EntryRow } from '@/features/entry-row';

type TGetEntryTextParams = {
  t: (string: string) => string;
} & Pick<TList, 'entries'>;

const getEntryText = (params: TGetEntryTextParams) => {
  const {
    t,
    entries,
  } = params;

  const lastEntry = entries?.[0];

  if (!lastEntry) {
    return t('list.entry.none');
  };

  return `${t('list.entry.last')} ${formatFullMoment(new Date(lastEntry.measuredAt))}`;
};

export const List: FCClass<TList> = ({
  className,
  vehicleId,
  vehicleName,
  entries,
}) => {
  const { t } = useTranslation();
  const { openPopup } = usePopups();

  const noEntries = !entries?.length;

  const handleFabItemClick = (itemValue: TFabButton['items'][0]['value']) => {
    if (itemValue === FAB_ITEM_VALUE.ODOMETER) {
      openPopup('odometer', { vehicleId });
      return;
    }

    if (itemValue === FAB_ITEM_VALUE.FUEL) {
      openPopup('fuel', { vehicleId });
    }
  };

  return (
    <div
      className={cx(
        'relative flex flex-col p-16',
        className,
      )}
    >
      <div
        className="mb-20"
      >
        {vehicleName && (
          <div
            className="h3"
          >
            {vehicleName}
          </div>
        )}

        <div
          className="text-black-200 t2"
        >
          {getEntryText({ t, entries })}
        </div>
      </div>

      {noEntries && (
        <ListStub
          vehicleId={vehicleId}
        />
      )}

      {!noEntries && (
        <div
          className="flex flex-col gap-8"
        >
          {entries?.map((entry) => {
            const { id } = entry;

            return (
              <EntryRow
                key={id}
                entry={entry}
              />
            );
          })}
        </div>
      )}

      <FabButton
        className="absolute bottom-20 right-20"
        items={[
          {
            title: t('list.fab.odometer'),
            value: FAB_ITEM_VALUE.ODOMETER,
            icon: IconsArray.odometer,
            iconClassName: 'bg-blue-100 fill-blue-200',
          },
          {
            title: t('list.fab.fuel'),
            value: FAB_ITEM_VALUE.FUEL,
            icon: IconsArray.fuel,
            iconClassName: 'bg-green-100 fill-green-200',
          },
        ]}
        onFabItemClick={handleFabItemClick}
      />
    </div>
  );
};
