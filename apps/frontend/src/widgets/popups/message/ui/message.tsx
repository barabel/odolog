import { useTranslation } from 'react-i18next';
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

      <button
        className="w-full h-40 border-1 border-black-100 rounded-xl"
        onClick={closePopup}
      >
        {t('popups.message.ok')}
      </button>
    </div>
  );
};
