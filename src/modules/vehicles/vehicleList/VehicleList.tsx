import { GetVehiclesQuery, Vehicle, VehicleEdge } from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { UseQueryState } from 'urql';
import VehicleListItem from '@/modules/vehicles/vehicleList/VehicleListItem';
import InView from 'react-intersection-observer';

type VehicleListProps = {
  variables: {
    first: number;
    after: string;
  };
  isLastPage: boolean;
  onLoadMore: (after: string) => void;
  vehiclesList: UseQueryState<GetVehiclesQuery, object>;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
  changeAddVehicleModalState: (newState: boolean) => void;
  changeDeleteVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleCVRTModalState: (newState: boolean) => void;
  changeUpdateVehicleThirteenWeekModalState: (newState: boolean) => void;
  changeUpdateVehicleTachoCalibrationModalState: (newState: boolean) => void;
};

const VehicleList = ({
  variables,
  isLastPage,
  onLoadMore,
  vehiclesList,
  changeCurrentVehicle,
  changeAddVehicleModalState,
  changeDeleteVehicleModalState,
  changeUpdateVehicleModalState,
  changeUpdateVehicleCVRTModalState,
  changeUpdateVehicleThirteenWeekModalState,
  changeUpdateVehicleTachoCalibrationModalState,
}: VehicleListProps) => {
  const { data, fetching, error } = vehiclesList;

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.vehicles.pageInfo;

  const vehicles = data.vehicles;

  return vehicles.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {vehicles.edges.map((vehicle) => {
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
          />;
        })}
      </ul>
      <InView
        onChange={() => {
          if (hasNextPage == true) {
            onLoadMore(vehicles.pageInfo.endCursor as string);
          }
        }}
      >
        {({ inView, ref }) => (
          <div ref={ref}>{hasNextPage && inView && <Loading />}</div>
        )}
      </InView>
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
