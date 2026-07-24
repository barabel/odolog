export type TSheetFrame = {
  id: string;
  key: string;
  props: unknown;
  open: boolean;
};

export const pushFrame = (frames: TSheetFrame[], frame: TSheetFrame): TSheetFrame[] => {
  return [...frames, frame];
};

export const closeTopFrame = (frames: TSheetFrame[]): TSheetFrame[] => {
  const topOpenIndex = frames.findLastIndex(frame => frame.open);

  if (topOpenIndex === -1) {
    return frames;
  }

  return frames.map((frame, index) => {
    if (index !== topOpenIndex) {
      return frame;
    }

    return { ...frame, open: false };
  });
};

export const removeFrame = (frames: TSheetFrame[], id: string): TSheetFrame[] => {
  return frames.filter(frame => frame.id !== id);
};
