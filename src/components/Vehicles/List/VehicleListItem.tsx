import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  deleteVehicleModalStateVar,
  updateVehicleCVRTModalStateVar,
  updateVehicleModalStateVar,
  updateVehicleTachoCalibrationModalStateVar,
  updateVehicleThirteenWeekModalStateVar,
} from 'constants/apollo-client';
import Button from 'core/Table/Button';
import {
  useUpdateVehicleTachoCalibrationMutation,
  Vehicle,
  VehicleType,
} from 'generated/graphql';
import Link from 'next/link';
import classNames from 'utilities/classNames';
import { dateStatus } from 'utilities/dateStatus';
import { getDateClassNames } from 'utilities/getDateClassName';
import { format } from 'date-fns';

type VehicleListItemProps = {
  vehicle: Vehicle;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
};

const VehicleListItem = ({
  vehicle,
  changeCurrentVehicle,
}: VehicleListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {vehicle.registration}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentVehicle(vehicle);
                    deleteVehicleModalStateVar(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Model: {vehicle.make} {vehicle.model}{' '}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    changeCurrentVehicle(vehicle);
                    updateVehicleCVRTModalStateVar(true);
                  }}
                  className={getDateClassNames(
                    dateStatus(new Date(vehicle.cvrt?.dueDate))
                  )}
                >
                  {format(new Date(vehicle.cvrt?.dueDate), 'dd/MM/yyyy')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    changeCurrentVehicle(vehicle);
                    updateVehicleThirteenWeekModalStateVar(true);
                  }}
                  className={getDateClassNames(
                    dateStatus(
                      new Date(vehicle.thirteenWeekInspection?.dueDate)
                    )
                  )}
                >
                  {format(
                    new Date(vehicle.thirteenWeekInspection?.dueDate),
                    'dd/MM/yyyy'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    changeCurrentVehicle(vehicle);
                    updateVehicleTachoCalibrationModalStateVar(true);
                  }}
                  className={classNames(
                    vehicle.tachoCalibration != null
                      ? getDateClassNames(
                          dateStatus(new Date(vehicle.tachoCalibration.dueDate))
                        )
                      : 'py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                  )}
                >
                  {vehicle.tachoCalibration?.dueDate
                    ? format(
                        new Date(vehicle.tachoCalibration.dueDate),
                        'dd/MM/yyyy'
                      )
                    : 'N/A'}
                </button>

                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {vehicle.model}
                </p>
              </div>
              <Button
                onClick={() => {
                  changeCurrentVehicle(vehicle);
                  updateVehicleModalStateVar(true);
                }}
              >
                <PencilIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default VehicleListItem;
