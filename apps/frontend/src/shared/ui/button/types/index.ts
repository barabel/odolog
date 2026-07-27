export type TButtonVariant = 'blue' | 'transparent';

export type TButton = {
  variant?: TButtonVariant;
  type?: 'button' | 'submit';
  typography?: string;
  disabled?: boolean;
  url?: string;
  onClick?: () => void;
};
