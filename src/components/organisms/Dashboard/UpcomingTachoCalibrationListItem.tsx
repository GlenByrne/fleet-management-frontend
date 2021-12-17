import { Vehicle } from '@/generated/graphql';
import { dateStatus } from '@/utilities/dateStatus';
import { getDateClassNamesDashboard } from '@/utilities/getDateClassNamesDashboard';
import { format } from 'date-fns';

type UpcomingTachoCalibrationListItemProps = {
  vehicle: Vehicle;
};

const UpcomingTachoCalibrationListItem = ({
  vehicle,
}: UpcomingTachoCalibrationListItemProps) => {
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="mt-4 shrink-0 sm:mt-0 sm:ml-5">
            <div className="flex overflow-hidden -space-x-1">
              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {vehicle.registration}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    //   changeCurrentVehicle(vehicle);
                    //   updateVehicleCVRTModalStateVar(true);
                  }}
                  className={getDateClassNamesDashboard(
                    dateStatus(vehicle.tachoCalibration)
                  )}
                >
                  {format(new Date(vehicle.tachoCalibration), 'dd/MM/yyyy')}
                </button>
              </span>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default UpcomingTachoCalibrationListItem;
