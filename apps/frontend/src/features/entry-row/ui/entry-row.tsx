import cx from 'classix';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import type { TEntryRow } from '../types';
import { Icon } from '@/shared/ui/icon';
import { IconsArray } from '@/shared/enums/icons';
import { formatFullMoment } from '@/shared/lib/date';
import { formatNumber } from '@/shared/lib/number';

const TYPE_APPEARANCE = {
  odometer: {
    icon: IconsArray.odometer,
    className: 'bg-blue-100 fill-blue-200',
  },
  fuel: {
    icon: IconsArray.fuel,
    className: 'bg-green-100 fill-green-200',
  },
} as const;

export const EntryRow: FCClass<TEntryRow> = ({
  className,
  entry,
}) => {
  const { t } = useTranslation();

  const {
    type,
    measuredAt,
    odometer,
  } = entry;

  const {
    icon,
    className: appearanceClassName,
  } = TYPE_APPEARANCE[type];

  const values = [
    {
      value: odometer,
      unit: t('entry.unit.odometer'),
    },
  ];

  if (entry.type === 'fuel') {
    values.push(
      {
        value: entry.liters,
        unit: t('entry.unit.liters'),
      },
      {
        value: entry.totalCost,
        unit: t('entry.unit.currency'),
      },
    );
  }

  return (
    <div
      className={cx(
        'flex items-center gap-12 p-12 border-1 border-white-200 rounded-xl',
        className,
      )}
    >
      <div
        className={cx(
          'flex items-center justify-center w-40 min-w-40 h-40 rounded-full',
          appearanceClassName,
        )}
      >
        <Icon
          className="w-20 min-w-20 h-20"
          icon={icon}
        />
      </div>

      <div
        className="flex flex-col gap-4 min-w-0"
      >
        <div
          className="truncate t2"
        >
          {values.map((item, index) => {
            const {
              value,
              unit,
            } = item;

            return (
              <Fragment
                key={unit}
              >
                {index > 0 && (
                  <span
                    className="text-black-200"
                  >
                    {' · '}
                  </span>
                )}

                {formatNumber(value)}

                <span
                  className="text-black-200"
                >
                  {` ${unit}`}
                </span>
              </Fragment>
            );
          })}
        </div>

        <div
          className="text-black-200 t4"
        >
          {formatFullMoment(new Date(measuredAt))}
        </div>
      </div>
    </div>
  );
};
