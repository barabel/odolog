import cx from 'classix';
import { useTranslation } from 'react-i18next';
import type { TList } from '../types';
import { FabButton, type TFabButton } from '@/shared/ui/fab-button';
import { IconsArray } from '@/shared/enums/icons';
import { ListStub } from './stub/stub';
import { FAB_ITEM_VALUE } from '../const';
import { openSheet } from '@/shared/lib/bottom-sheet';
import { usePopups } from '@/shared/lib/popups';

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
  vehicleName,
  entries,
}) => {
  const { t } = useTranslation();
  const { openPopup } = usePopups();

  const noEntries = !entries?.length;

  const handleFabItemClick = (itemValue: TFabButton['items'][0]['value']) => {
    if (itemValue === FAB_ITEM_VALUE.ODOMETER) {
      openPopup('odometer');
      return;
    }

    if (itemValue === FAB_ITEM_VALUE.FUEL) {
      openSheet('fuel');
    }
  };

  return (
    <div
      className={cx(
        'flex flex-col p-16',
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
        <ListStub />
      )}

      <FabButton
        className="mt-auto"
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
