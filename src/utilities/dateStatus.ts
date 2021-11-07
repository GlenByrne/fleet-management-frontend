import { DateStatus } from 'constants/types';

export const dateStatus = (date: Date) => {
  let twoWeeks = new Date();
  twoWeeks.setDate(twoWeeks.getDate() + 14);

  const timeDifference = date.getTime() - twoWeeks.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  if (dayDifference > 14) {
    return DateStatus.NOT_SOON;
  } else if (dayDifference <= 14 && dayDifference >= 0) {
    return DateStatus.UPCOMING_NEXT_14_DAYS;
  } else {
    return DateStatus.OUT_OF_DATE;
  }
};
