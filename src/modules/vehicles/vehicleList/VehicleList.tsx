import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetVehiclesQuery, Vehicle } from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import VehicleListItem from '@/modules/vehicles/vehicleList/VehicleListItem';

type VehicleListProps = {
  changeCurrentVehicle: (vehicle: Vehicle) => void;
  changeAddVehicleModalState: (newState: boolean) => void;
  changeDeleteVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleCVRTModalState: (newState: boolean) => void;
  changeUpdateVehicleThirteenWeekModalState: (newState: boolean) => void;
  changeUpdateVehicleTachoCalibrationModalState: (newState: boolean) => void;
};

function VehicleList({
  changeCurrentVehicle,
  changeAddVehicleModalState,
  changeDeleteVehicleModalState,
  changeUpdateVehicleModalState,
  changeUpdateVehicleCVRTModalState,
  changeUpdateVehicleThirteenWeekModalState,
  changeUpdateVehicleTachoCalibrationModalState,
}: VehicleListProps) {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetVehiclesQuery({
    variables: {
      first: 5,
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first: 5,
      data: {
        searchCriteria,
        organisationId,
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div />;
  }

  const { vehicles } = data;

  return vehicles.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {vehicles.edges.map((vehicle) => (
          <VehicleListItem
            key={vehicle.node.id}
            vehicle={vehicle.node as Vehicle}
            changeCurrentVehicle={changeCurrentVehicle}
            changeDeleteVehicleModalState={changeDeleteVehicleModalState}
            changeUpdateVehicleModalState={changeUpdateVehicleModalState}
            changeUpdateVehicleCVRTModalState={
              changeUpdateVehicleCVRTModalState
            }
            changeUpdateVehicleThirteenWeekModalState={
              changeUpdateVehicleThirteenWeekModalState
            }
            changeUpdateVehicleTachoCalibrationModalState={
              changeUpdateVehicleTachoCalibrationModalState
            }
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddVehicleModalState(true)}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      text="Add a new vehicle"
    />
  );
}

export default VehicleList;
