import cx from 'classix';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';

import { closeSheet, removeSheetFrame, useSheetStore } from '../model/store';
import type { TSheetRegistry } from '../types/registry';
import type { TSheetKey } from '../types';

type TBottomSheetStack = {
  registry: TSheetRegistry;
};

export const BottomSheetStack: FCClass<TBottomSheetStack> = ({ registry }) => {
  const frames = useSheetStore(state => state.frames);
  const shouldReduceMotion = useReducedMotion();

  const hasOpenFrame = frames.some(frame => frame.open);

  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

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

  return (
    <>
      <AnimatePresence>
        {hasOpenFrame && (
          <motion.div
            className="fixed inset-0 z-30 bg-black-100/40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeSheet}
          />
        )}
      </AnimatePresence>

      {frames.map((frame) => {
        const SheetComponent = registry[frame.key as TSheetKey];

        return (
          <AnimatePresence
            key={frame.id}
            onExitComplete={() => removeSheetFrame(frame.id)}
          >
            {frame.open && (
              <motion.div
                className="fixed bottom-0 inset-x-0 z-40 flex justify-center"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div
                  className={cx(
                    'flex flex-col w-full max-w-[375px] max-h-[90svh]',
                    'bg-white-100 rounded-t-2xl overflow-hidden',
                  )}
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
                      close={closeSheet}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </>
  );
};
