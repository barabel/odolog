import i18n from '@/i18n';

const getLocale = () => i18n.language;

const DECIMAL_PATTERN = /^\d+([.,]\d+)?$/;

export const parseDecimal = (value: string): number | null => {
  if (!DECIMAL_PATTERN.test(value)) {
    return null;
  }

  return Number(value.replace(',', '.'));
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat(getLocale(), {
    maximumFractionDigits: 2,
  }).format(value);
};
