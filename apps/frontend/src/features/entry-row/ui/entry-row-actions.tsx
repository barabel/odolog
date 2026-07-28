import cx from 'classix';
import { useEffect } from 'react';
import {
  motion,
  useAnimationControls,
  type PanInfo,
} from 'motion/react';
import type { TEntryRowAction, TEntryRowActions } from '../types';
import { Icon } from '@/shared/ui/icon';
import { SWIPE_ACTION_WIDTH, SWIPE_FLICK_VELOCITY } from '../const';

const VARIANT_CLASS_NAME: Record<TEntryRowAction['variant'], string> = {
  red: 'bg-red-200 fill-white-100 text-white-100',
};

export const EntryRowActions: FCClass<TEntryRowActions> = ({
  className,
  children,
  actions,
  isOpen,
  onOpenChange,
}) => {
  const drawerWidth = actions.length * SWIPE_ACTION_WIDTH;

  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: isOpen ? -drawerWidth : 0,
    });
  }, [
    controls,
    drawerWidth,
    isOpen,
  ]);

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    const {
      offset,
      velocity,
    } = info;

    const isFlickLeft = velocity.x < -SWIPE_FLICK_VELOCITY;
    const isFlickRight = velocity.x > SWIPE_FLICK_VELOCITY;

    const projectedX = (isOpen ? -drawerWidth : 0) + offset.x;

    const shouldOpen = isFlickLeft || (!isFlickRight && projectedX < -drawerWidth / 2);

    controls.start({
      x: shouldOpen ? -drawerWidth : 0,
    });

    onOpenChange(shouldOpen);
  };

  const handleTap = () => {
    if (isOpen) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-xl',
        className,
      )}
    >
      <div
        className="absolute inset-y-0 right-0 flex"
      >
        {actions.map((action) => {
          const {
            value,
            title,
            icon,
            variant,
            onClick,
          } = action;

          return (
            <button
              key={value}
              type="button"
              className={cx(
                'flex flex-col items-center justify-center gap-4 shrink-0 cursor-pointer',
                't3',
                VARIANT_CLASS_NAME[variant],
              )}
              style={{
                width: SWIPE_ACTION_WIDTH,
              }}
              onClick={onClick}
            >
              <Icon
                className="w-20 min-w-20 h-20"
                icon={icon}
              />

              {title}
            </button>
          );
        })}
      </div>

      <motion.div
        className="relative bg-white-100 touch-pan-y"
        drag="x"
        dragDirectionLock
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={{
          left: -drawerWidth,
          right: 0,
        }}
        animate={controls}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
      >
        {children}
      </motion.div>
    </div>
  );
};
