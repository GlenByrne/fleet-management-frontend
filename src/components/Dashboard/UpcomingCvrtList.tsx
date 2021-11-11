import { ApolloError } from '@apollo/client';
import Loading from 'core/Loading';
import { Vehicle } from 'generated/graphql';
import UpcomingCvrtListItem from './UpcomingCvrtListItem';

type UpcomingCvrtListProps = {
  vans: Vehicle[];
  trucks: Vehicle[];
  trailers: Vehicle[];
};

const UpcomingCvrtList = ({
  vans,
  trucks,
  trailers,
}: UpcomingCvrtListProps) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="grid grid-cols-5 gap-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
              Vans
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {vans.map((vehicle) => (
              <UpcomingCvrtListItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
              Trucks
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {trucks.map((vehicle) => (
              <UpcomingCvrtListItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
              Trailers
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {trailers.map((vehicle) => (
              <UpcomingCvrtListItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCvrtList;
