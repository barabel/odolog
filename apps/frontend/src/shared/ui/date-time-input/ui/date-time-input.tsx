import cx from 'classix';
import { formatFullMoment } from '@/shared/lib/date';
import type { TDateTimeInput } from '../types';

export const DateTimeInput: FCClass<TDateTimeInput> = ({
  className,
  value,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cx(
        'flex items-center h-40 px-20 border-1 border-black-100 rounded-xl text-left',
        className,
      )}
      onClick={onClick}
    >
      {formatFullMoment(value)}
    </button>
  );
};
