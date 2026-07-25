import i18n from '@/i18n';

const getLocale = () => i18n.language;

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat(getLocale(), {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

export const formatFullMoment = (date: Date) => {
  const datePart = new Intl.DateTimeFormat(getLocale(), {
    day: 'numeric',
    month: 'long',
  }).format(date);

  return `${datePart}, ${formatTime(date)}`;
};

export const combineDateAndTime = (date: Date, time: Date) => {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combined;
};

export const nowWithZeroedSeconds = () => {
  const now = new Date();
  now.setSeconds(0, 0);
  return now;
};
