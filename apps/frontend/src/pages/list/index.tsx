import { db } from '@/shared/lib/db';
import cx from 'classix';
import { useLiveQuery } from 'dexie-react-hooks';

export const ListPage: FCClass = ({
  className,
}) => {
  const vehicles = useLiveQuery(() => {
    return db.vehicles
      .toArray();
  });

  return (
    <div
      className={cx(
        't1',
        className,
      )}
    >
      {vehicles?.map(({ id, name }) => {
        return (
          <div
            key={id}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
