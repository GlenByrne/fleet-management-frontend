import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  deleteVehicleModalStateVar,
  updateVehicleModalStateVar,
} from 'constants/apollo-client';
import Button from 'core/Table/Button';
import { Vehicle } from 'generated/graphql';

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
                Model: {vehicle.make} {vehicle.model}
              </p>
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
    </li>
  );
};

export default VehicleListItem;