import { DateStatus } from 'constants/types';

export const dateStatus = (date: Date) => {
  const oneDayInMs = 1000 * 60 * 60 * 24;

  const timeDifference = date.getTime() - new Date().getTime();
  const dayDifference = Math.round(timeDifference / oneDayInMs);

  if (dayDifference > 14) {
    return DateStatus.NOT_SOON;
  } else if (dayDifference <= 14 && dayDifference >= 0) {
    return DateStatus.UPCOMING_NEXT_14_DAYS;
  } else {
    return DateStatus.OUT_OF_DATE;
  }
};
