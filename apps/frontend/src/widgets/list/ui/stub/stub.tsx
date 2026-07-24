import { IconsArray } from '@/shared/enums/icons';
import { Icon } from '@/shared/ui/icon';
import cx from 'classix';
import { useTranslation } from 'react-i18next';

export const ListStub: FCClass = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center p-20 border-1 border-white-200 rounded-xl',
        className,
      )}
    >
      <div
        className="flex items-center justify-center w-80 min-w-80 h-80 mb-20 rounded-full bg-blue-100"
      >
        <Icon
          className="w-40 min-w-40 h-40 fill-blue-200"
          icon={IconsArray.odometer}
        />
      </div>

      <div
        className="flex flex-col items-center justify-center gap-10 mb-20 text-center"
      >
        <div
          className="h4"
        >
          {t('list.stub.title')}
        </div>

        <div
          className="text-black-200 t2"
        >
          {t('list.stub.description')}
        </div>
      </div>

      {/* TODO: открывать bottom sheet после реализации своего механизма */}
      <div
        className="flex items-center gap-10"
      >
        <button
          className="grow-1 basis-1/2 h-40 px-16 border-1 border-white-200 rounded-xl"
        >
          {t('list.stub.odometerButton')}
        </button>

        <button
          className="grow-1 basis-1/2 h-40 px-16 border-1 border-white-200 rounded-xl"
        >
          {t('list.stub.fuelButton')}
        </button>
      </div>
    </div>
  );
};
