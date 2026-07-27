import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/shared/ui/calendar';
import { TimeField } from '@/shared/ui/time-field';
import { Button } from '@/shared/ui/button';
import { combineDateAndTime } from '@/shared/lib/date';
import type { TPopupDateTimePicker } from '../types';

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

      <TimeField
        value={draft}
        onConfirm={setDraft}
      />

      <Button
        className="w-full"
        onClick={confirm}
      >
        {t('popups.dateTimePicker.submit.title')}
      </Button>
    </div>
  );
};
