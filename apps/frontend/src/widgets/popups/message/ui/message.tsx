import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import type { TPopupMessage } from '../types';

export const PopupMessage: FCPopup<TPopupMessage> = ({
  closePopup,
  title,
  description,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center gap-10 p-20 text-center"
    >
      <div>
        {title}
      </div>

      {description && (
        <div>
          {description}
        </div>
      )}

      <Button
        className="w-full"
        onClick={closePopup}
      >
        {t('popups.message.ok')}
      </Button>
    </div>
  );
};
