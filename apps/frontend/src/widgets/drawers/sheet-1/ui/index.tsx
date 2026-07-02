import { useParams } from 'react-router';

// Начинка шита — обычный компонент без единого Drawer.*. Chrome (хендл, кнопка
// закрытия) приходит из механизма. Доступен роутер-контекст (провайдер внутри
// BrowserRouter).
export const Sheet1 = () => {
  const { vehicleId } = useParams();

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
    </div>
  );
};
