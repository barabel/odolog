// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopupsMap {}

export type TPopupKey = keyof PopupsMap;

export type TPopupProps<K extends TPopupKey> = PopupsMap[K];
