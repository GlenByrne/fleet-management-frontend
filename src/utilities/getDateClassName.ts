import { DateStatus } from '@/constants/types';

export const getDateClassNames = (status: DateStatus) => {
  if (status === DateStatus.NOT_SOON) {
    return 'py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75';
  } else if (status === DateStatus.UPCOMING_NEXT_14_DAYS) {
    return 'py-2 px-4 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75';
  } else if (status === DateStatus.OUT_OF_DATE) {
    return 'py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75';
  } else if (status === DateStatus.NONE) {
    return 'py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';
  }
};
