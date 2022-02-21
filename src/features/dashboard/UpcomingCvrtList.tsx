import { Vehicle } from '@/generated/graphql';
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
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="grid grid-cols-5 gap-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
              Vans
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {vans.map((vehicle) => (
              <UpcomingCvrtListItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
              Trucks
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {trucks.map((vehicle) => (
              <UpcomingCvrtListItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium leading-6 text-gray-900">
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
