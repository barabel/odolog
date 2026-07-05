import Picker from 'react-mobile-picker';
import type { PickerValue } from 'react-mobile-picker';
import type { TDatePicker } from '../types';
import cx from 'classix';

const pad2 = (n: number) => n.toString().padStart(2, '0');

const range = (from: number, to: number): number[] => {
  const result: number[] = [];

  for (let i = from; i <= to; i += 1) {
    result.push(i);
  }

  return result;
};

// число дней в месяце (month — 1-based)
const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const CURRENT_YEAR = new Date().getFullYear();

const YEARS = range(CURRENT_YEAR - 30, CURRENT_YEAR + 1);
const MONTHS = range(1, 12);
const HOURS = range(0, 23);
const MINUTES = range(0, 59);

const MONTH_NAMES = MONTHS.map((month) => {
  return new Intl.DateTimeFormat('ru', { month: 'long' }).format(
    new Date(2000, month - 1, 1),
  );
});

export const DateWheel: FCClass<TDatePicker> = ({
  className,
  selected,
  onChange,
}) => {
  const base = selected ?? new Date();

  const value: PickerValue = {
    day: String(base.getDate()),
    month: String(base.getMonth() + 1),
    year: String(base.getFullYear()),
    hour: String(base.getHours()),
    minute: String(base.getMinutes()),
  };

  const days = range(
    1,
    daysInMonth(Number(value.year), Number(value.month)),
  );

  const handleChange = (next: PickerValue) => {
    const year = Number(next.year);
    const month = Number(next.month);
    const hour = Number(next.hour);
    const minute = Number(next.minute);
    const day = Math.min(Number(next.day), daysInMonth(year, month));

    onChange?.(new Date(year, month - 1, day, hour, minute));
  };

  return (
    <Picker
      className={cx(className)}
      value={value}
      onChange={handleChange}
      wheelMode="natural"
    >
      <Picker.Column
        name="day"
      >
        {days.map((day) => {
          return (
            <Picker.Item
              key={day}
              value={String(day)}
            >
              {day}
            </Picker.Item>
          );
        })}
      </Picker.Column>

      <Picker.Column
        name="month"
      >
        {MONTHS.map((month) => {
          return (
            <Picker.Item
              key={month}
              value={String(month)}
            >
              {MONTH_NAMES[month - 1]}
            </Picker.Item>
          );
        })}
      </Picker.Column>

      <Picker.Column
        name="year"
      >
        {YEARS.map((year) => {
          return (
            <Picker.Item
              key={year}
              value={String(year)}
            >
              {year}
            </Picker.Item>
          );
        })}
      </Picker.Column>

      <Picker.Column
        name="hour"
      >
        {HOURS.map((hour) => {
          return (
            <Picker.Item
              key={hour}
              value={String(hour)}
            >
              {pad2(hour)}
            </Picker.Item>
          );
        })}
      </Picker.Column>

      <Picker.Column
        name="minute"
      >
        {MINUTES.map((minute) => {
          return (
            <Picker.Item
              key={minute}
              value={String(minute)}
            >
              {pad2(minute)}
            </Picker.Item>
          );
        })}
      </Picker.Column>
    </Picker>
  );
};
