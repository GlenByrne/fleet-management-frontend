import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { format } from 'date-fns';
import DefectsButton from '@/components/atoms/Button/DefectsButton';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { Vehicle } from '@/generated/graphql';
import { dateStatus } from '@/utilities/dateStatus';
import { getDateClassNames } from '@/utilities/getDateClassName';

type VehicleListItemProps = {
  vehicle: Vehicle;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
  changeDeleteVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleCVRTModalState: (newState: boolean) => void;
  changeUpdateVehicleThirteenWeekModalState: (newState: boolean) => void;
  changeUpdateVehicleTachoCalibrationModalState: (newState: boolean) => void;
};

function VehicleListItem({
  vehicle,
  changeCurrentVehicle,
  changeDeleteVehicleModalState,
  changeUpdateVehicleModalState,
  changeUpdateVehicleCVRTModalState,
  changeUpdateVehicleThirteenWeekModalState,
  changeUpdateVehicleTachoCalibrationModalState,
}: VehicleListItemProps) {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const showDefectsHandler = () => {
    router.push(
      `/${encodeURIComponent(organisationId)}/defects/${encodeURIComponent(
        vehicle.id
      )}`
    );
  };

  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {vehicle.registration}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentVehicle(vehicle);
                    changeDeleteVehicleModalState(true);
                  }}
                />
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
                    if (vehicle.cvrt != null) {
                      changeCurrentVehicle(vehicle);
                      changeUpdateVehicleCVRTModalState(true);
                    }
                  }}
                  className={getDateClassNames(dateStatus(vehicle.cvrt))}
                >
                  {vehicle.cvrt != null
                    ? format(new Date(vehicle.cvrt), 'dd/MM/yyyy')
                    : 'None'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (vehicle.thirteenWeekInspection != null) {
                      changeCurrentVehicle(vehicle);
                      changeUpdateVehicleThirteenWeekModalState(true);
                    }
                  }}
                  className={getDateClassNames(
                    dateStatus(vehicle.thirteenWeekInspection)
                  )}
                >
                  {vehicle.thirteenWeekInspection != null
                    ? format(
                        new Date(vehicle.thirteenWeekInspection),
                        'dd/MM/yyyy'
                      )
                    : 'None'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (vehicle.tachoCalibration != null) {
                      changeCurrentVehicle(vehicle);
                      changeUpdateVehicleTachoCalibrationModalState(true);
                    }
                  }}
                  className={getDateClassNames(
                    dateStatus(vehicle.tachoCalibration)
                  )}
                >
                  {vehicle.tachoCalibration
                    ? format(new Date(vehicle.tachoCalibration), 'dd/MM/yyyy')
                    : 'None'}
                </button>

                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {vehicle.model}
                </p>
              </div>
              <EditButton
                onClick={() => {
                  changeCurrentVehicle(vehicle);
                  changeUpdateVehicleModalState(true);
                }}
              />
              <DefectsButton onClick={showDefectsHandler} />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default VehicleListItem;
