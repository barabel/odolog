import type { TEntries } from '@odolog/shared';
import type { IconsArray } from '@/shared/enums/icons';

export type TEntryRow = {
  entry: TEntries;
};

export type TEntryRowAction = {
  value: string;
  title: string;
  icon: IconsArray;
  variant: 'red';
  onClick: () => void;
};

export type TEntryRowActions = {
  actions: TEntryRowAction[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};
