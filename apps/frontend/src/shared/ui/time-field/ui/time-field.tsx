import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TimepickerUI } from 'timepicker-ui';
import { combineDateAndTime, formatTime } from '@/shared/lib/date';
import type { TTimeField } from '../types';
import 'timepicker-ui/main.css';
import './time-field.scss';

export const TimeField: FCClass<TTimeField> = ({
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
        backdrop: false,
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
      className="flex items-center justify-between h-40 px-20 border-1 border-black-100 rounded-xl w-full"
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
