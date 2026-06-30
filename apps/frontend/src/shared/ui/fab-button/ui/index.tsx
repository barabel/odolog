import cx from 'classix';
import type { TFabButton } from '../types';
import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import { Icon } from '../../icon';
import { IconsArray } from '@/shared/enums/icons';
import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useOutsideClick } from '@/shared/hooks/use-outside-click';

const containerVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const FabButton: FCClass<TFabButton> = ({
  className,
  items,
  onFabItemClick,
}) => {
  const hasItems = isArrayAndNotEmpty(items);

  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false), isOpen);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (value: TFabButton['items'][0]['value']) => {
    onFabItemClick?.(value);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={cx(
        'flex flex-col gap-12 pointer-events-none',
        className,
      )}
    >
      {hasItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cx(
                'flex flex-col items-end gap-12',
              )}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {items.map((item, index) => {
                const {
                  title,
                  value,
                  icon,
                  iconClassName,
                } = item;

                return (
                  <motion.div
                    key={index}
                    className="flex gap-8 pointer-events-auto origin-bottom-right"
                    variants={itemVariants}
                    onClick={() => handleItemClick(value)}
                  >
                    {title && (
                      <div
                        className={cx(
                          'flex items-center justify-center h-48 px-12 rounded-xl',
                          'shadow-[0_4px_16px] shadow-black-100/8',
                          't2',
                        )}
                      >
                        {title}
                      </div>
                    )}

                    {icon && (
                      <div
                        className={cx(
                          'flex items-center justify-center w-48 min-w-48 h-48 rounded-xl',
                          'shadow-[0_4px_16px] shadow-black-100/8',
                          iconClassName,
                        )}
                      >
                        <Icon
                          className="w-24 min-w-24 h-24"
                          icon={icon}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <button
        className={cx(
          'flex items-center justify-center w-52 min-w-52 h-52 ml-auto bg-blue-200 rounded-full cursor-pointer pointer-events-auto',
          'shadow-[0_3px_10px] shadow-blue-200/35',
          'transition-transform duration-300',
          't2',
        )}
        onClick={handleButtonClick}
      >
        <Icon
          icon={IconsArray.close}
          className={cx(
            'stroke-white-100 stroke-2',
            'transition-[rotate] duration-300',
            isOpen ? 'rotate-90' : 'rotate-45',
          )}
        />
      </button>
    </div>
  );
};
