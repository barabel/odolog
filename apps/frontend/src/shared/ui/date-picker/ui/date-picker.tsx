import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DateWheel } from './date-wheel';
import type { TDatePicker } from '../types';
import cx from 'classix';

const formatter = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const DatePicker: FCClass<TDatePicker> = ({
  className,
  selected,
  onChange,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<Date>(selected ?? new Date());

  const open = () => {
    setDraft(selected ?? new Date());
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  const confirm = () => {
    onChange?.(draft);
    close();
  };

  return (
    <>
      <button
        type="button"
        className={cx(
          'flex items-center h-40 px-20 border-1 border-black-100 rounded-xl text-left',
          className,
        )}
        onClick={open}
      >
        {selected ? formatter.format(selected) : 'Дата и время'}
      </button>

      {createPortal(
        <dialog
          ref={dialogRef}
          className="m-auto w-320 max-w-full rounded-2xl bg-white-100 backdrop:bg-black-100/40"
          onClick={(e) => {
            if (e.target === dialogRef.current) {
              close();
            }
          }}
        >
          <div
            className="flex flex-col gap-20 p-20"
          >
            <DateWheel
              selected={draft}
              onChange={(date) => {
                if (date) {
                  setDraft(date);
                }
              }}
            />

            <div
              className="flex gap-10"
            >
              <button
                type="button"
                className="flex-1 h-40 border-1 border-black-100 rounded-xl"
                onClick={close}
              >
                Отмена
              </button>

              <button
                type="button"
                className="flex-1 h-40 border-1 border-black-100 rounded-xl"
                onClick={confirm}
              >
                Готово
              </button>
            </div>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  );
};
