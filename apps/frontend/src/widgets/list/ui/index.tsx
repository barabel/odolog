import cx from 'classix';
import type { TList } from '../types';
import { FabButton } from '@/shared/ui/fab-button';

export const List: FCClass<TList> = ({
  className,
  vehicleName,
}) => {
  return (
    <div
      className={cx(
        'p-16',
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
        items={[
          {
            title: '1',
            value: '1',
          },
          {
            title: '2',
            value: '2',
          },
        ]}
      />
    </div>
  );
};
