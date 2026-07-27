export type TButtonVariant = 'blue' | 'white';

export type TButton = {
  variant?: TButtonVariant;
  type?: 'button' | 'submit';
  typography?: string;
  disabled?: boolean;
  url?: string;
  onClick?: () => void;
};
