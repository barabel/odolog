import type { TEntries } from '@odolog/shared';

export const sortEntries = (entries: TEntries[]): TEntries[] => {
  return [...entries].sort((a, b) => {
    if (a.measuredAt !== b.measuredAt) {
      return b.measuredAt - a.measuredAt;
    }

    return b.createdAt - a.createdAt;
  });
};
