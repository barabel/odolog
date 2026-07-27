import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TimepickerUI } from 'timepicker-ui';
import cx from 'classix';
import { combineDateAndTime, formatTime } from '@/shared/lib/date';
import type { TTimeField } from '../types';
import 'timepicker-ui/main.css';
import './time-field.scss';

export const TimeField: FCClass<TTimeField> = ({
  className,
  value,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<TimepickerUI | null>(null);
  const valueRef = useRef(value);
  const onConfirmRef = useRef(onConfirm);

  valueRef.current = value;
  onConfirmRef.current = onConfirm;

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const picker = new TimepickerUI(inputRef.current, {
      clock: {
        type: '24h',
        incrementMinutes: 1,
      },
      ui: {
        backdrop: true,
        enableScrollbar: true,
        enableSwitchIcon: true,
      },
      labels: {
        ok: t('popups.dateTimePicker.time.confirm'),
        time: t('popups.dateTimePicker.time.title'),
      },
      callbacks: {
        onConfirm: ({ hour, minutes }) => {
          const time = new Date();
          time.setHours(Number(hour), Number(minutes));
          onConfirmRef.current(combineDateAndTime(valueRef.current, time));
        },
      },
    });

    picker.create();
    pickerRef.current = picker;

    return () => {
      picker.destroy();
      pickerRef.current = null;
    };
  }, [t]);

  return (
    <button
      type="button"
      className={cx(
        'flex items-center justify-between gap-10 h-48 px-20 border-1 rounded-xl text-left',
        't1',
        'bg-gray-100 border-white-200 text-black-100',
        className,
      )}
      onClick={() => {
        pickerRef.current?.open();
      }}
    >
      <span>
        {t('popups.dateTimePicker.time.label')}
      </span>

      <input
        ref={inputRef}
        type="text"
        readOnly
        tabIndex={-1}
        defaultValue={formatTime(value)}
        className="sr-only"
      />

      <span>
        {formatTime(value)}
      </span>
    </button>
  );
};
