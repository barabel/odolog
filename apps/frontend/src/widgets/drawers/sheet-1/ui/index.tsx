import { useParams } from 'react-router';
import { useDrawer, type DrawerComponent } from '@/shared/lib/drawer';

export const Sheet1: DrawerComponent = () => {
  const { vehicleId } = useParams();
  const { openDrawer } = useDrawer();

  return (
    <div
      className="flex flex-col gap-8 px-16"
    >
      <div
        className="h3"
      >
        Sheet 1
      </div>

      <div
        className="text-black-200 t2"
      >
        Тестовый шит механизма drawer'ов. vehicleId:
        {' '}
        {vehicleId ?? '—'}
      </div>

      <button
        type="button"
        className="mt-8 rounded-xl bg-blue-200 px-16 py-12 text-white-100 t2 cursor-pointer"
        onClick={() => openDrawer('sheet-2')}
      >
        Открыть Sheet 2
      </button>
    </div>
  );
};
