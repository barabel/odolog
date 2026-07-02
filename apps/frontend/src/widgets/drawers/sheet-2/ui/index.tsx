import type { DrawerComponent } from '@/shared/lib/drawer';

export const Sheet2: DrawerComponent = ({ close }) => {
  return (
    <div
      className="flex flex-col gap-8 px-16"
    >
      <div
        className="h3"
      >
        Sheet 2
      </div>

      <div
        className="text-black-200 t2"
      >
        Вложенный тестовый шит — открыт поверх Sheet 1.
      </div>

      <button
        type="button"
        className="mt-8 rounded-xl bg-blue-200 px-16 py-12 text-white-100 t2 cursor-pointer"
        onClick={close}
      >
        Закрыть себя
      </button>
    </div>
  );
};
