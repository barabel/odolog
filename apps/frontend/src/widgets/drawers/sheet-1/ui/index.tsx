import { useParams } from 'react-router';
import { useDrawer } from '@/shared/lib/drawer';

// Начинка шита — обычный компонент без единого Drawer.*. Chrome (хендл, кнопка
// закрытия) приходит из механизма. Доступен роутер-контекст (провайдер внутри
// BrowserRouter).
export const Sheet1 = () => {
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
