import { AnimatePresence, motion, type Variants } from 'motion/react';
import { RemoveScroll } from 'react-remove-scroll';

import { closeSheet, useSheetStore } from '../model/store';
import { BottomSheetPanel } from './bottom-sheet-panel';
import type { TSheetRegistry } from '../types/registry';

type TBottomSheetStack = {
  registry: TSheetRegistry;
};

export const BottomSheetStack: FCClass<TBottomSheetStack> = ({ registry }) => {
  const frames = useSheetStore(state => state.frames);

  const hasOpenFrame = frames.some(frame => frame.open);
  const topOpenIndex = frames.findLastIndex(frame => frame.open);

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

  return (
    <RemoveScroll enabled={frames.length > 0}>
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

      {frames.map((frame, index) => {
        return (
          <BottomSheetPanel
            key={frame.id}
            frame={frame}
            index={index}
            isTopOpen={index === topOpenIndex}
            registry={registry}
          />
        );
      })}
    </RemoveScroll>
  );
};
