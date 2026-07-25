import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { DateTimeInput } from '@/shared/ui/date-time-input';
import { usePopups } from '@/shared/lib/popups';
import { nowWithZeroedSeconds } from '@/shared/lib/date';

export const PopupOdometer: FCPopup = ({
  closePopup,
}) => {
  const { t } = useTranslation();
  const { openPopup } = usePopups();

  const {
    control,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      date: nowWithZeroedSeconds(),
      odometer: undefined,
    },
  });

  const onSumbit = handleSubmit((data) => {
    console.log('data', data);
    closePopup();
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
        onSubmit={onSumbit}
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
              {...register('odometer')}
              className="flex w-full h-40 pl-20 pr-45 border-1 border-black-100 rounded-xl"
            />

            <div
              className="absolute top-1/2 right-20 -translate-y-1/2"
            >
              {t('popups.odometer.inputValue.unit')}
            </div>
          </div>
        </label>

        <button
          className="w-full h-40 border-1 border-black-100 rounded-xl"
        >
          {t('popups.odometer.submit.title')}
        </button>
      </form>
    </div>
  );
};
