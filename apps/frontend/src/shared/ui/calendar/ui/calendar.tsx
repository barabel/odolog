import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import cx from 'classix';
import type { TCalendar } from '../types';
import 'react-day-picker/style.css';
import './calendar.scss';

const LOCALES = {
  ru,
};

const START_MONTH = new Date(1900, 0);
const END_MONTH = new Date(2100, 11);

export const Calendar: FCClass<TCalendar> = ({
  className,
  selected,
  onSelect,
}) => {
  const { i18n } = useTranslation();
  const locale = LOCALES[i18n.language as keyof typeof LOCALES] ?? ru;

  return (
    <DayPicker
      className={cx('calendar', className)}
      mode="single"
      required
      selected={selected}
      defaultMonth={selected}
      onSelect={(date) => {
        onSelect(date);
      }}
      locale={locale}
      captionLayout="dropdown-years"
      startMonth={START_MONTH}
      endMonth={END_MONTH}
    />
  );
};
