import { db } from '@/shared/lib/db';
import cx from 'classix';
import { useLiveQuery } from 'dexie-react-hooks';

export const MainPage: FCClass = ({
  className,
}) => {
  const vehicles = useLiveQuery(() => {
    return db.vehicles
      .toArray();
  });

  return (
    <div
      className={cx(
        'mt-300 ml-300 t1',
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
