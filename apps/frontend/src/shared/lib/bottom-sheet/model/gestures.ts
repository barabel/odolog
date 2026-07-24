export const DISMISS_OFFSET_THRESHOLD = 100;
export const DISMISS_VELOCITY_THRESHOLD = 500;

export const shouldDismissSheet = (offsetY: number, velocityY: number): boolean => {
  return offsetY >= DISMISS_OFFSET_THRESHOLD || velocityY >= DISMISS_VELOCITY_THRESHOLD;
};
