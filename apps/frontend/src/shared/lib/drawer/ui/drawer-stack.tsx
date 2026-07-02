import { useContext, useEffect, useState, type Dispatch } from 'react';
import { Drawer } from 'vaul';
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

// Скорость закрытия анимации vaul - 500мс, тут с запасом
const EXIT_ANIMATION_MS = 550 as const;

type TDrawerFrame = {
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(frame.open);

    if (frame.open) {
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch({ type: 'remove', id: frame.id });
    }, EXIT_ANIMATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [frame.open, frame.id, dispatch]);

  if (!entry) {
    return null;
  }

  const Content = entry.component;

  const Root = depth === 0 ? Drawer.Root : Drawer.NestedRoot;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      dispatch({ type: 'close' });
    }
  };

  return (
    <Root
      {...frame.options}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="z-30 fixed inset-0 bg-black-100/40"
        />

        <Drawer.Content
          className="z-40 fixed inset-x-0 bottom-0 mx-auto flex flex-col max-w-375 rounded-t-2xl bg-white-100 pb-16 outline-none"
        >
          <Drawer.Handle
            className="my-12"
          />

          <Content
            {...(frame.props as object)}
            close={() => dispatch({ type: 'close' })}
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
