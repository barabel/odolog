import type { Frame, DrawerStackAction } from '../types';

export const drawerStackReducer = (
  state: Frame[],
  action: DrawerStackAction,
): Frame[] => {
  switch (action.type) {
    case 'open':
      return [...state, action.frame];

    case 'close': {
      const lastOpenIndex = state.findLastIndex((frame) => {
        return frame.open;
      });

      if (lastOpenIndex === -1) {
        return state;
      }

      return state.map((frame, index) => {
        if (index !== lastOpenIndex) {
          return frame;
        }

        return {
          ...frame,
          open: false,
        };
      });
    }

    case 'closeAll':
      return state.map((frame) => {
        return {
          ...frame,
          open: false,
        };
      });

    case 'remove':
      return state.filter((frame) => {
        return frame.id !== action.id;
      });

    default:
      return state;
  }
};
