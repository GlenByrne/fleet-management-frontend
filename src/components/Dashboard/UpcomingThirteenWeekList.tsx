import { Vehicle } from '@/generated/graphql';
import UpcomingThirteenWeekListItem from './UpcomingThirteenWeekListItem';

type UpcomingThirteenWeekListProps = {
  vans: Vehicle[];
  trucks: Vehicle[];
  trailers: Vehicle[];
};

const UpcomingThirteenWeekList = ({
  vans,
  trucks,
  trailers,
}: UpcomingThirteenWeekListProps) => {
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
              <UpcomingThirteenWeekListItem
                key={vehicle.id}
                vehicle={vehicle}
              />
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
              <UpcomingThirteenWeekListItem
                key={vehicle.id}
                vehicle={vehicle}
              />
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
              <UpcomingThirteenWeekListItem
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpcomingThirteenWeekList;
