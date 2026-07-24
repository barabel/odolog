export type TSheetFrame = {
  id: string;
  key: string;
  props: unknown;
  open: boolean;
};

export const pushFrame = (
  frames: TSheetFrame[],
  frame: TSheetFrame,
  allowDuplicate = false,
): TSheetFrame[] => {
  if (!allowDuplicate) {
    const topOpenFrame = frames.findLast(existing => existing.open);

    if (topOpenFrame?.key === frame.key) {
      return frames;
    }
  }

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

export const closeFrameById = (frames: TSheetFrame[], id: string): TSheetFrame[] => {
  return frames.map((frame) => {
    if (frame.id !== id) {
      return frame;
    }

    return { ...frame, open: false };
  });
};

export const removeFrame = (frames: TSheetFrame[], id: string): TSheetFrame[] => {
  return frames.filter(frame => frame.id !== id);
};

export const closeAllFrames = (_frames: TSheetFrame[]): TSheetFrame[] => {
  return [];
};
