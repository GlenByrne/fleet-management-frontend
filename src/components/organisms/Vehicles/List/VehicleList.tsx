import { format } from 'date-fns';
import { ApolloError } from '@apollo/client';
import {
  GetVehiclesQuery,
  Vehicle,
  VehicleConnection,
} from '@/generated/graphql';
import Link from 'next/link';
import { getDateClassNames } from '@/utilities/getDateClassName';
import { dateStatus } from '@/utilities/dateStatus';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Loading from '@/components/atoms/Loading';
import EditButton from '@/components/atoms/EditButton';
import DefectsButton from '@/components/atoms/DefectsButton';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import DeleteButton from '@/components/atoms/DeleteButton';

type VehicleListProps = {
  data: GetVehiclesQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  fetchMore: () => void;
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
  fetchMore,
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

  const { hasNextPage } = data.vehicles?.pageInfo;

  const vehicles = data.vehicles as VehicleConnection;

  return vehicles.edges?.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {vehicles.edges?.map((vehicle) => {
          const showDefectsHandler = () => {
            router.push(
              `/organisations/${encodeURIComponent(
                organisationId
              )}/defects/${encodeURIComponent(vehicle?.node?.id)}`
            );
          };

          return (
            <li key={vehicle?.node?.id}>
              <Link href="#">
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {vehicle?.node?.registration}
                      </p>
                      <div className="ml-2 flex shrink-0">
                        <DeleteButton
                          onClick={() => {
                            changeCurrentVehicle(vehicle.node);
                            changeDeleteVehicleModalState(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Model: {vehicle?.node?.make} {vehicle?.node?.model}{' '}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            if (vehicle?.node?.cvrt != null) {
                              changeCurrentVehicle(vehicle.node);
                              changeUpdateVehicleCVRTModalState(true);
                            }
                          }}
                          className={getDateClassNames(
                            dateStatus(vehicle?.node?.cvrt)
                          )}
                        >
                          {vehicle?.node?.cvrt != null
                            ? format(new Date(vehicle.node.cvrt), 'dd/MM/yyyy')
                            : 'None'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (vehicle?.node?.thirteenWeekInspection != null) {
                              changeCurrentVehicle(vehicle.node);
                              changeUpdateVehicleThirteenWeekModalState(true);
                            }
                          }}
                          className={getDateClassNames(
                            dateStatus(vehicle?.node?.thirteenWeekInspection)
                          )}
                        >
                          {vehicle?.node?.thirteenWeekInspection != null
                            ? format(
                                new Date(vehicle.node.thirteenWeekInspection),
                                'dd/MM/yyyy'
                              )
                            : 'None'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (vehicle?.node?.tachoCalibration != null) {
                              changeCurrentVehicle(vehicle.node);
                              changeUpdateVehicleTachoCalibrationModalState(
                                true
                              );
                            }
                          }}
                          className={getDateClassNames(
                            dateStatus(vehicle?.node?.tachoCalibration)
                          )}
                        >
                          {vehicle?.node?.tachoCalibration
                            ? format(
                                new Date(vehicle.node.tachoCalibration),
                                'dd/MM/yyyy'
                              )
                            : 'None'}
                        </button>

                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <LocationMarkerIcon
                            className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {vehicle?.node?.model}
                        </p>
                      </div>
                      <EditButton
                        onClick={() => {
                          changeCurrentVehicle(vehicle?.node);
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
    <NoListItemButton
      onClick={() => changeAddVehicleModalState(true)}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      text="Add a new vehicle"
    />
  );
};

export default VehicleList;
