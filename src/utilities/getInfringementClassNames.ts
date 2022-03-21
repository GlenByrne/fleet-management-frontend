import { InfringementStatus } from '@/generated/graphql';

const getInfringementClassNames = (status: InfringementStatus) => {
  if (status === InfringementStatus.Signed) {
    return 'py-2 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75';
  }
  if (status === InfringementStatus.Unsigned) {
    return 'py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75';
  }

  return '';
};

export default getInfringementClassNames;
