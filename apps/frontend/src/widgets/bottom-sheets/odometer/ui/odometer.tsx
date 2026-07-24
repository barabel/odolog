import { DatePicker } from '@/shared/ui/date-picker';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';

type TBottomSheetOdometer = {
  close: () => void;
};

export const BottomSheetOdometer: FCClass<TBottomSheetOdometer> = ({
  close,
}) => {
  const { t } = useTranslation();

  const {
    control,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      date: null as Date | null,
      odometer: undefined,
    },
  });

  const onSumbit = handleSubmit((data) => {
    console.log('data', data);
    close();
  });

  return (
    <div
      className="p-20"
    >
      <div
        className="mb-20"
      >
        {t('bottomSheets.odometer.title')}
      </div>

      <form
        className="flex flex-col gap-10"
        onSubmit={onSumbit}
      >
        <div
          className="flex flex-col gap-4 w-full"
        >
          <div>
            {t('bottomSheets.odometer.datePicker.label')}
          </div>

          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => {
              return (
                <DatePicker
                  className="w-full"
                  selected={value ? new Date(value) : null}
                  onChange={(date: Date | null) => {
                    onChange(date ? date.getTime() : undefined);
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
            {t('bottomSheets.odometer.inputValue.label')}
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
              {t('bottomSheets.odometer.inputValue.unit')}
            </div>
          </div>
        </label>

        <button
          className="w-full h-40 border-1 border-black-100 rounded-xl"
        >
          {t('bottomSheets.odometer.submit.title')}
        </button>
      </form>
    </div>
  );
};
