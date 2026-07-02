import { useContext, useEffect, useState, type Dispatch } from 'react';
import { Drawer } from 'vaul';
import { Icon } from '@/shared/ui/icon';
import { IconsArray } from '@/shared/enums/icons';
import { DrawerStateContext } from '../model/context';
import type {
  DrawerRegistry,
  DrawerStackAction,
  Frame,
} from '../types';

type TDrawerStack = {
  registry: DrawerRegistry;
  dispatch: Dispatch<DrawerStackAction>;
};

type TDrawerFrame = {
  // Хвост стека от текущей позиции: голова — этот фрейм, остальное — вложенные.
  frames: Frame[];
  depth: number;
  registry: DrawerRegistry;
  dispatch: Dispatch<DrawerStackAction>;
};

const DrawerFrame = ({
  frames,
  depth,
  registry,
  dispatch,
}: TDrawerFrame) => {
  const [frame, ...rest] = frames;
  const entry = registry[frame.key];

  // Локальный open стартует с false и на след. кадре повторяет frame.open —
  // так vaul видит переход false→true и проигрывает выезд снизу (enter).
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(frame.open);
  }, [frame.open]);

  if (!entry) {
    return null;
  }

  const Content = entry.component;

  // Корневой фрейм → Root; вложенные → NestedRoot (читает контекст родителя,
  // чтобы vaul масштабировал его при открытии вложенного).
  const Root = depth === 0 ? Drawer.Root : Drawer.NestedRoot;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      // Жест/Esc/тап-вне → закрываем верхний тем же путём, что и closeDrawer.
      dispatch({ type: 'close' });
    }
  };

  const handleAnimationEnd = (isOpen: boolean) => {
    if (!isOpen) {
      // Анимация съезда доиграла — только теперь физически убираем фрейм.
      dispatch({ type: 'remove', id: frame.id });
    }
  };

  return (
    <Root
      {...frame.options}
      open={open}
      onOpenChange={handleOpenChange}
      onAnimationEnd={handleAnimationEnd}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-40 bg-black-100/40"
        />

        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-375 flex-col rounded-t-2xl bg-white-100 pb-16 outline-none"
        >
          <Drawer.Handle
            className="my-12"
          />

          <button
            type="button"
            className="absolute right-16 top-16 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 cursor-pointer"
            onClick={() => dispatch({ type: 'close' })}
          >
            <Icon
              className="stroke-black-100 stroke-2 rotate-45"
              icon={IconsArray.close}
            />
          </button>

          <Content
            {...(frame.props as object)}
          />

          {rest.length > 0 && (
            <DrawerFrame
              frames={rest}
              depth={depth + 1}
              registry={registry}
              dispatch={dispatch}
            />
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Root>
  );
};

export const DrawerStack = ({
  registry,
  dispatch,
}: TDrawerStack) => {
  const stack = useContext(DrawerStateContext);

  if (stack.length === 0) {
    return null;
  }

  return (
    <DrawerFrame
      frames={stack}
      depth={0}
      registry={registry}
      dispatch={dispatch}
    />
  );
};
