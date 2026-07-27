import cx from 'classix';
import { formatFullMoment } from '@/shared/lib/date';
import { Icon } from '@/shared/ui/icon';
import { IconsArray } from '@/shared/enums/icons';
import type { TDateTimeInput } from '../types';

export const DateTimeInput: FCClass<TDateTimeInput> = ({
  className,
  value,
  onClick,
  label,
}) => {
  return (
    <div
      className={cx(
        'flex flex-col gap-4',
        className,
      )}
    >
      {label && (
        <div>
          {label}
        </div>
      )}

      <button
        type="button"
        className={cx(
          'flex items-center gap-10 h-48 px-20 border-1 rounded-xl text-left',
          'bg-gray-100 border-white-200 text-black-100',
          'text-base!',
          't2',
        )}
        onClick={onClick}
      >
        <Icon
          className="stroke-black-100"
          icon={IconsArray.calendar}
        />

        {formatFullMoment(value)}
      </button>
    </div>
  );
};
