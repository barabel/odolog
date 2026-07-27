import cx from 'classix';
import { Link } from 'react-router';
import type { TButton, TButtonVariant } from '../types';

const variants: Record<TButtonVariant, string> = {
  blue: 'bg-blue-200 text-white-100 hover:bg-blue-300 active:bg-blue-300',
  white: 'bg-white-100 border-1 border-white-200 text-black-100 hover:bg-gray-100 active:bg-white-200',
};

export const Button: FCClass<TButton> = ({
  className,
  children,
  variant = 'blue',
  type = 'button',
  typography = 't2',
  disabled,
  url,
  onClick,
}) => {
  const classNames = cx(
    'flex items-center justify-center h-40 px-10 rounded-xl transition-colors duration-150',
    variants[variant],
    typography,
    className,
  );

  if (url) {
    return (
      <Link
        className={classNames}
        to={url}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cx(
        classNames,
        'disabled:opacity-40 disabled:pointer-events-none',
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
