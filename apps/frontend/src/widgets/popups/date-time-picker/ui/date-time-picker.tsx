import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/shared/ui/calendar';
import { combineDateAndTime, formatTime } from '@/shared/lib/date';

type TPopupDateTimePicker = {
  value: Date;
  onConfirm: (value: Date) => void;
};

export const PopupDateTimePicker: FCPopup<TPopupDateTimePicker> = ({
  value,
  onConfirm,
  closePopup,
}) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(value);

  const confirm = () => {
    onConfirm(draft);
    closePopup();
  };

  return (
    <div
      className="flex flex-col gap-20 p-20"
    >
      <Calendar
        selected={draft}
        onSelect={(date) => {
          setDraft(combineDateAndTime(date, draft));
        }}
      />

      <div
        className="flex items-center justify-between h-40 px-20 border-1 border-black-100 rounded-xl"
      >
        <div>
          {t('popups.dateTimePicker.time.label')}
        </div>

        <div>
          {formatTime(draft)}
        </div>
      </div>

      <button
        type="button"
        className="w-full h-40 border-1 border-black-100 rounded-xl"
        onClick={confirm}
      >
        {t('popups.dateTimePicker.submit.title')}
      </button>
    </div>
  );
};
