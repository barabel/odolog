import cx from 'classix';
import type { TFabButton } from '../types';
// import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import { Icon } from '../../icon';
import { IconsArray } from '@/shared/enums/icons';

export const FabButton: FCClass<TFabButton> = ({
  className,
  // items,
}) => {
  // const hasItems = isArrayAndNotEmpty(items);

  return (
    <div
      className={cx(
        className,
      )}
    >
      <button
        className={cx(
          'flex items-center justify-center w-52 min-w-52 h-52 bg-blue-200 rounded-full cursor-pointer',
          'shadow-[0_3px_10px] shadow-blue-200/35',
          'transition-transform duration-300',
          'hover:scale-107',
          't1',
        )}
      >
        <Icon
          icon={IconsArray.close}
          className="stroke-white-100"
        />
      </button>
    </div>
  );
};
