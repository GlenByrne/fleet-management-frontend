import NoVehiclesAddButton from './NoVehiclesAddButton';
import VehicleListItem from './VehicleListItem';
import { ApolloError } from '@apollo/client';
import { GetVehiclesQuery, Vehicle } from '@/generated/graphql';
import Loading from '@/components/Atomic/atoms/Loading';

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
        {vehicles.map((vehicle) => (
          <VehicleListItem
            key={vehicle.id}
            vehicle={vehicle}
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
    <NoVehiclesAddButton onClick={changeAddVehicleModalState} />
  );
};

export default VehicleList;
