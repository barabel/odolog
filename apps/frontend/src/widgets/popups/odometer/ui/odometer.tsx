import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { DateTimeInput } from '@/shared/ui/date-time-input';
import { Button } from '@/shared/ui/button';
import { usePopups, useSuccessPopup, useErrorPopup } from '@/shared/lib/popups';
import { nowWithZeroedSeconds } from '@/shared/lib/date';
import { createOdometerEntry } from '@/entities/entry';
import type { TOdometerForm, TPopupOdometer } from '../types';

export const PopupOdometer: FCPopup<TPopupOdometer> = ({
  vehicleId,
}) => {
  const { t } = useTranslation();
  const { openPopup } = usePopups();
  const { showSuccess } = useSuccessPopup();
  const { showError } = useErrorPopup();

  const {
    control,
    register,
    handleSubmit,
    formState: {
      isValid,
      isSubmitting,
    },
  } = useForm<TOdometerForm>({
    mode: 'onChange',
    defaultValues: {
      date: nowWithZeroedSeconds(),
      odometer: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const {
      date,
      odometer,
    } = data;

    try {
      await createOdometerEntry({
        vehicleId,
        measuredAt: date.getTime(),
        odometer: Number(odometer),
      });

      showSuccess();
    }
    catch {
      showError();
    }
  });

  return (
    <div
      className="p-20"
    >
      <div
        className="mb-20"
      >
        {t('popups.odometer.title')}
      </div>

      <form
        className="flex flex-col gap-10"
        onSubmit={onSubmit}
      >
        <div
          className="flex flex-col gap-4 w-full"
        >
          <div>
            {t('popups.odometer.dateTimeInput.label')}
          </div>

          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => {
              return (
                <DateTimeInput
                  className="w-full"
                  value={value}
                  onClick={() => {
                    openPopup('dateTimePicker', {
                      value,
                      onConfirm: onChange,
                    });
                  }}
                />
              );
            }}
          />
        </div>

        <label
          className="flex flex-col gap-4 w-full"
        >
          <div>
            {t('popups.odometer.inputValue.label')}
          </div>

          <div
            className="grow-1 relative"
          >
            <input
              {...register('odometer', {
                required: true,
                validate: value => /^\d+$/.test(value) && Number(value) >= 1,
              })}
              inputMode="numeric"
              className="flex w-full h-40 pl-20 pr-45 border-1 border-black-100 rounded-xl"
            />

            <div
              className="absolute top-1/2 right-20 -translate-y-1/2"
            >
              {t('popups.odometer.inputValue.unit')}
            </div>
          </div>
        </label>

        <Button
          className="w-full"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {t('popups.odometer.submit.title')}
        </Button>
      </form>
    </div>
  );
};
