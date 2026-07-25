import { useRef } from 'react';
import { motion, type Variant } from 'motion/react';
import { RemoveScroll } from 'react-remove-scroll';

type TPopupsWrapperVariants = {
  initial: Variant;
  animate: Variant;
  exit: Variant;
};

type TPopupsWrapper = {
  motionVariants?: TPopupsWrapperVariants;
  closePopup: () => void;
};

const DEFAULT_VARIANTS: TPopupsWrapperVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const PopupsWrapper: FCClass<TPopupsWrapper> = ({
  motionVariants = DEFAULT_VARIANTS,
  closePopup,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      closePopup();
    }
  };

  return (
    <RemoveScroll>
      <motion.div
        ref={overlayRef}
        variants={motionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-16 bg-black-100/50"
        onClick={handleOverlayClick}
      >
        <div
          className="w-full max-w-[375px] max-h-full overflow-y-auto rounded-xl bg-white-100"
        >
          {children}
        </div>
      </motion.div>
    </RemoveScroll>
  );
};
