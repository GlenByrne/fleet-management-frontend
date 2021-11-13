import { InfringementStatus } from 'generated/graphql';

export const getInfringementClassNames = (status: InfringementStatus) => {
  if (status === InfringementStatus.Signed) {
    return 'py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75';
  } else if (status === InfringementStatus.Unsigned) {
    return 'py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75';
  }
};
