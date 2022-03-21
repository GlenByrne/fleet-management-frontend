import { DateStatus } from '@/constants/types';

const dateStatus = (value: any | null) => {
  if (value == null) {
    return DateStatus.NONE;
  }

  const date = new Date(value);

  const oneDayInMs = 1000 * 60 * 60 * 24;

  const timeDifference = date.getTime() - new Date().getTime();
  const dayDifference = Math.ceil(timeDifference / oneDayInMs);

  if (dayDifference > 14) {
    return DateStatus.NOT_SOON;
  }
  if (dayDifference <= 14 && dayDifference >= 0) {
    return DateStatus.UPCOMING_NEXT_14_DAYS;
  }
  return DateStatus.OUT_OF_DATE;
};

export default dateStatus;
