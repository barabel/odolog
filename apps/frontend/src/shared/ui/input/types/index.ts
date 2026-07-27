export type TInputVariant = 'blue' | 'green';

export type TInput = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  unit?: string;
  variant?: TInputVariant;
  typography?: string;
  inputMode?: 'text' | 'numeric' | 'decimal';
  disabled?: boolean;
};
