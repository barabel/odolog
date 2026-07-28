import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { DateTimeInput } from '@/shared/ui/date-time-input';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { usePopups, useSuccessPopup, useErrorPopup } from '@/shared/lib/popups';
import { nowWithZeroedSeconds } from '@/shared/lib/date';
import { parseDecimal, formatNumber } from '@/shared/lib/number';
import { createFuelEntry, pricePerLiter } from '@/entities/entry';
import type { TFuelForm, TPopupFuel } from '../types';
import cx from 'classix';

export const PopupFuel: FCPopup<TPopupFuel> = ({
  vehicleId,
}) => {
  const { t } = useTranslation();
  const { openPopup } = usePopups();
  const { showSuccess } = useSuccessPopup();
  const { showError } = useErrorPopup();

  const {
    control,
    handleSubmit,
    formState: {
      isValid,
      isSubmitting,
    },
  } = useForm<TFuelForm>({
    mode: 'onChange',
    defaultValues: {
      date: nowWithZeroedSeconds(),
      odometer: '',
      liters: '',
      totalCost: '',
    },
  });

  const [liters, totalCost] = useWatch({
    control,
    name: ['liters', 'totalCost'],
  });

  const parsedLiters = parseDecimal(liters);
  const parsedCost = parseDecimal(totalCost);

  const price = parsedLiters !== null && parsedCost !== null
    ? pricePerLiter(parsedCost, parsedLiters)
    : null;

  const pricePerLiterText = price !== null
    ? t('popups.fuel.pricePerLiter.value', { value: formatNumber(price) })
    : t('popups.fuel.pricePerLiter.empty');

  const onSubmit = handleSubmit(async (data) => {
    const {
      date,
      odometer,
      liters,
      totalCost,
    } = data;

    try {
      await createFuelEntry({
        vehicleId,
        measuredAt: date.getTime(),
        odometer: Number(odometer),
        liters: parseDecimal(liters)!,
        totalCost: parseDecimal(totalCost)!,
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
        className={cx(
          'mb-20',
          't1',
        )}
      >
        {t('popups.fuel.title')}
      </div>

      <form
        className="flex flex-col gap-16"
        onSubmit={onSubmit}
      >
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => {
            return (
              <DateTimeInput
                className="w-full"
                label={t('popups.fuel.dateTimeInput.label')}
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

        <div
          className="flex gap-16"
        >
          <Controller
            control={control}
            name="odometer"
            rules={{
              required: true,
              validate: (value) => {
                return /^\d+$/.test(value) && Number(value) >= 1;
              },
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  className="flex-1 min-w-0"
                  variant="green"
                  label={t('popups.fuel.odometer.label')}
                  unit={t('popups.fuel.odometer.unit')}
                  inputMode="numeric"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="liters"
            rules={{
              required: true,
              validate: (value) => {
                const parsed = parseDecimal(value);
                return parsed !== null && parsed > 0;
              },
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  className="flex-1 min-w-0"
                  variant="green"
                  label={t('popups.fuel.liters.label')}
                  unit={t('popups.fuel.liters.unit')}
                  inputMode="decimal"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        <div
          className="flex flex-col gap-4"
        >
          <Controller
            control={control}
            name="totalCost"
            rules={{
              required: true,
              validate: (value) => {
                const parsed = parseDecimal(value);
                return parsed !== null && parsed >= 0;
              },
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <Input
                  className="w-full"
                  variant="green"
                  label={t('popups.fuel.totalCost.label')}
                  unit={t('popups.fuel.totalCost.unit')}
                  inputMode="decimal"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />

          <div
            className="t2"
          >
            {pricePerLiterText}
          </div>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {t('popups.fuel.submit.title')}
        </Button>
      </form>
    </div>
  );
};
