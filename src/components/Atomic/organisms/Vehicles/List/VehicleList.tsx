import { format } from 'date-fns';
import { ApolloError } from '@apollo/client';
import { GetVehiclesQuery, Vehicle } from '@/generated/graphql';
import Loading from '@/components/Atomic/atoms/Loading';
import Link from 'next/link';
import DeleteButton from '@/components/Atomic/atoms/DeleteButton';
import { getDateClassNames } from '@/utilities/getDateClassName';
import { dateStatus } from '@/utilities/dateStatus';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import EditButton from '@/components/Atomic/atoms/EditButton';
import { useRouter } from 'next/router';
import DefectsButton from '@/components/Atomic/atoms/DefectsButton';
import NoListItemButton from '@/components/Atomic/atoms/NoListItemButton';

type VehicleListProps = {
  data: GetVehiclesQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
  changeAddVehicleModalState: (newState: boolean) => void;
  changeDeleteVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleCVRTModalState: (newState: boolean) => void;
  changeUpdateVehicleThirteenWeekModalState: (newState: boolean) => void;
  changeUpdateVehicleTachoCalibrationModalState: (newState: boolean) => void;
};

const VehicleList = ({
  data,
  loading,
  error,
  changeCurrentVehicle,
  changeAddVehicleModalState,
  changeDeleteVehicleModalState,
  changeUpdateVehicleModalState,
  changeUpdateVehicleCVRTModalState,
  changeUpdateVehicleThirteenWeekModalState,
  changeUpdateVehicleTachoCalibrationModalState,
}: VehicleListProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const vehicles = data.vehicles as Vehicle[];

  return vehicles.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {vehicles.map((vehicle) => {
          const showDefectsHandler = () => {
            router.push(
              `/organisations/${encodeURIComponent(
                organisationId
              )}/defects/${encodeURIComponent(vehicle.id)}`
            );
          };

          return (
            <li key={vehicle.id}>
              <Link href="#">
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {vehicle.registration}
                      </p>
                      <div className="ml-2 shrink-0 flex">
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
                          className={getDateClassNames(
                            dateStatus(vehicle.cvrt)
                          )}
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
                              changeUpdateVehicleTachoCalibrationModalState(
                                true
                              );
                            }
                          }}
                          className={getDateClassNames(
                            dateStatus(vehicle.tachoCalibration)
                          )}
                        >
                          {vehicle.tachoCalibration
                            ? format(
                                new Date(vehicle.tachoCalibration),
                                'dd/MM/yyyy'
                              )
                            : 'None'}
                        </button>

                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <LocationMarkerIcon
                            className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
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
        })}
      </ul>
    </div>
  ) : (
    // <NoVehiclesAddButton onClick={changeAddVehicleModalState} />
    <NoListItemButton
      onClick={() => changeAddVehicleModalState(true)}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      text="Add a new vehicle"
    />
  );
};

export default VehicleList;
