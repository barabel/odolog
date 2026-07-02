import type { Frame, DrawerStackAction } from '../types';

// Чистая механика стека drawer'ов: без React/vaul. Двухфазное закрытие —
// `close` лишь ставит верхнему open:false, физическое удаление делает `remove`.
export const drawerStackReducer = (
  state: Frame[],
  action: DrawerStackAction,
): Frame[] => {
  switch (action.type) {
    case 'open':
      return [...state, action.frame];

    case 'close': {
      if (state.length === 0) {
        return state;
      }

      const lastIndex = state.length - 1;

      return state.map((frame, index) => {
        if (index !== lastIndex) {
          return frame;
        }

        return {
          ...frame,
          open: false,
        };
      });
    }

    case 'remove':
      return state.filter((frame) => {
        return frame.id !== action.id;
      });

    default:
      return state;
  }
};
