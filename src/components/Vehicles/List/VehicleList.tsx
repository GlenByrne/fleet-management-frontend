import { GetVehiclesQuery, Vehicle } from 'generated/graphql';
import { VehicleUpdateModalItem } from 'constants/types';
import {
  addVehicleModalStateVar,
  currentVehicleVar,
} from 'constants/apollo-client';
import Loading from 'core/Loading';
import NoVehiclesAddButton from './NoVehiclesAddButton';
import VehicleListItem from './VehicleListItem';
import { ApolloError } from '@apollo/client';

type VehicleListProps = {
  data: GetVehiclesQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const VehicleList = ({ data, loading, error }: VehicleListProps) => {
  const changeCurrentVehicle = (vehicle: Vehicle) => {
    const chosenVehicle: VehicleUpdateModalItem = {
      id: vehicle.id,
      type: vehicle.type,
      registration: vehicle.registration,
      make: vehicle.make,
      model: vehicle.model,
      owner: vehicle.owner,
      cvrtDueDate: vehicle.cvrtDueDate,
      tachoCalibrationDueDate: vehicle.tachoCalibrationDueDate,
      thirteenWeekInspectionDueDate: vehicle.thirteenWeekInspectionDueDate,
      depot: {
        id: vehicle.depot != null ? vehicle.depot.id : '',
        name: vehicle.depot != null ? vehicle.depot.name : '',
      },
      fuelCard: {
        id: vehicle.fuelCard == null ? '' : vehicle.fuelCard.id,
        cardNumber: vehicle.fuelCard == null ? '' : vehicle.fuelCard.cardNumber,
      },
      tollTag: {
        id: vehicle.tollTag == null ? '' : vehicle.tollTag.id,
        tagNumber: vehicle.tollTag == null ? '' : vehicle.tollTag.tagNumber,
      },
    };
    currentVehicleVar(chosenVehicle);
  };

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
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoVehiclesAddButton onClick={addVehicleModalStateVar} />
  );
};

export default VehicleList;
