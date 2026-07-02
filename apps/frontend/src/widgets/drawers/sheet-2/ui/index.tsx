// Начинка вложенного шита — обычный компонент без единого Drawer.*. Chrome
// (хендл, кнопка закрытия) приходит из механизма.
export const Sheet2 = () => {
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
    </div>
  );
};
