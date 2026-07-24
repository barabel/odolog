// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SheetRegistryMap {}

export type TSheetKey = keyof SheetRegistryMap;

export type TSheetProps<K extends TSheetKey> = SheetRegistryMap[K];
