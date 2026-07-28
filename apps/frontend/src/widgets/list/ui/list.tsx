import cx from 'classix';
import { useTranslation } from 'react-i18next';
import type { TList } from '../types';
import { FabButton, type TFabButton } from '@/shared/ui/fab-button';
import { IconsArray } from '@/shared/enums/icons';
import { ListStub } from './stub/stub';
import { FAB_ITEM_VALUE } from '../const';
import { usePopups } from '@/shared/lib/popups';
import { formatFullMoment } from '@/shared/lib/date';

type TGetEntryTextParams = {
  t: (string: string) => string;
} & Pick<TList, 'entries'>;

const getEntryText = (params: TGetEntryTextParams) => {
  const {
    t,
    entries,
  } = params;

  const noEntries = !entries?.length;

  if (noEntries) {
    return t('list.entry.none');
  };

  // TODO: сделать когда отрефакторю идею

  return '';
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

      {/* TODO: временный вывод записей, до вёрстки списка */}
      {!noEntries && (
        <div
          className="flex flex-col gap-8"
        >
          {entries?.map((entry) => {
            const {
              id,
              type,
              measuredAt,
              odometer,
            } = entry;

            return (
              <div
                key={id}
                className="flex justify-between gap-8 rounded-8 bg-gray-100 p-12 t2"
              >
                <div
                  className="flex flex-col"
                >
                  <span>
                    {type}
                  </span>

                  <span
                    className="text-black-200"
                  >
                    {formatFullMoment(new Date(measuredAt))}
                  </span>
                </div>

                <div
                  className="flex flex-col text-right"
                >
                  <span>
                    {odometer}
                  </span>

                  {entry.type === 'fuel' && (
                    <span
                      className="text-black-200"
                    >
                      {entry.liters}
                      {' л / '}
                      {entry.totalCost}
                    </span>
                  )}
                </div>
              </div>
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
