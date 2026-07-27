import cx from 'classix';
import type { TInput, TInputVariant } from '../types';

const variants: Record<TInputVariant, string> = {
  blue: 'bg-blue-100 border-blue-200 text-blue-200',
  green: 'bg-green-100 border-green-200 text-green-200',
};

const focusVariants: Record<TInputVariant, string> = {
  blue: 'focus-within:bg-blue-100 focus-within:border-blue-200 focus-within:text-blue-200',
  green: 'focus-within:bg-green-100 focus-within:border-green-200 focus-within:text-green-200',
};

export const Input: FCClass<TInput> = ({
  className,
  value,
  onChange,
  label,
  unit,
  variant = 'blue',
  typography = 't1',
  inputMode = 'text',
  disabled,
}) => {
  const isFilled = value !== '';

  return (
    <label
      className={cx(
        'flex flex-col gap-4',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
    >
      {label && (
        <div>
          {label}
        </div>
      )}

      <div
        className={cx(
          'flex items-center gap-10 h-48 px-20 border-1 rounded-xl transition-colors duration-150',
          typography,
          isFilled
            ? variants[variant]
            : cx('bg-gray-100 border-white-200 text-black-100', focusVariants[variant]),
        )}
      >
        <input
          className="grow min-w-0 bg-transparent outline-none"
          type="text"
          inputMode={inputMode}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />

        {unit && (
          <div
            className="shrink-0"
          >
            {unit}
          </div>
        )}
      </div>
    </label>
  );
};
