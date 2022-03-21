import { DateStatus } from '@/constants/types';

const getDateClassNamesDashboard = (status: DateStatus) => {
  if (status === DateStatus.NOT_SOON) {
    return '-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-emerald-500 text-sm text-white font-semibold shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75';
  }
  if (status === DateStatus.UPCOMING_NEXT_14_DAYS) {
    return '-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-amber-500 text-sm text-white font-semibold shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75';
  }
  if (status === DateStatus.OUT_OF_DATE) {
    return '-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-red-500 text-xs text-white font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75';
  }
  if (status === DateStatus.NONE) {
    return '-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-blue-500 text-sm text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';
  }
  return '';
};

export default getDateClassNamesDashboard;
