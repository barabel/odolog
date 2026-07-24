import cx from 'classix';
import { AnimatePresence, motion, useDragControls, useReducedMotion, type PanInfo, type Variants } from 'motion/react';

import { shouldDismissSheet } from '../model/gestures';
import { closeSheetById, removeSheetFrame } from '../model/store';
import type { TSheetFrame } from '../model/frames';
import type { TSheetRegistry } from '../types/registry';
import type { TSheetKey } from '../types';

type TBottomSheetPanel = {
  frame: TSheetFrame;
  index: number;
  isTopOpen: boolean;
  registry: TSheetRegistry;
};

const isDragBlocked = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.closest('[data-sheet-no-drag]')) {
    return true;
  }

  let node: HTMLElement | null = target;

  while (node) {
    if (node.scrollTop > 0) {
      return true;
    }

    node = node.parentElement;
  }

  return false;
};

export const BottomSheetPanel: FCClass<TBottomSheetPanel> = ({ frame, index, isTopOpen, registry }) => {
  const shouldReduceMotion = useReducedMotion();
  const dragControls = useDragControls();

  const SheetComponent = registry[frame.key as TSheetKey];

  const panelVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const handleDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (shouldDismissSheet(info.offset.y, info.velocity.y)) {
      closeSheetById(frame.id);
    }
  };

  return (
    <AnimatePresence onExitComplete={() => removeSheetFrame(frame.id)}>
      {frame.open && (
        <motion.div
          className={cx(
            'fixed bottom-0 inset-x-0 flex justify-center',
            !isTopOpen && 'pointer-events-none',
          )}
          style={{ zIndex: 40 + index }}
          aria-hidden={!isTopOpen}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          drag={isTopOpen ? 'y' : false}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0 }}
          dragElastic={{ top: 0, bottom: 0.5 }}
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
        >
          <div
            className={cx(
              'flex flex-col w-full max-w-[375px] max-h-[90svh]',
              'bg-white-100 rounded-t-2xl overflow-hidden',
            )}
            onPointerDown={(event) => {
              if (isTopOpen && !isDragBlocked(event.target)) {
                dragControls.start(event);
              }
            }}
          >
            <div
              className="flex justify-center shrink-0 py-8"
            >
              <div
                className="w-32 h-4 rounded-full bg-white-200"
              />
            </div>

            <div
              className="overflow-auto"
            >
              <SheetComponent
                {...(frame.props as object)}
                close={() => closeSheetById(frame.id)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
