import { Vehicle } from '@/generated/graphql';
import UpcomingTachoCalibrationListItem from './UpcomingTachoCalibrationListItem';

type UpcomingTachoCalibrationListProps = {
  vans: Vehicle[];
  trucks: Vehicle[];
  trailers: Vehicle[];
};

const UpcomingTachoCalibrationList = ({
  vans,
  trucks,
  trailers,
}: UpcomingTachoCalibrationListProps) => {
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
              <UpcomingTachoCalibrationListItem
                key={vehicle.id}
                vehicle={vehicle}
              />
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
              <UpcomingTachoCalibrationListItem
                key={vehicle.id}
                vehicle={vehicle}
              />
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
              <UpcomingTachoCalibrationListItem
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

export default UpcomingTachoCalibrationList;
