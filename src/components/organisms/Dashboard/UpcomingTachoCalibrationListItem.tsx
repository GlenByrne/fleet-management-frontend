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
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="mt-4 shrink-0 sm:mt-0 sm:ml-5">
            <div className="flex -space-x-1 overflow-hidden">
              <span className="relative z-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
