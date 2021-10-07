import { FC } from 'react';
import Button from '../../Table/Button';
import TableDataItem from '../../Table/TableDataItem';
import { useRouter } from 'next/router';
import { Vehicle } from '../../../lib/types';
import { useMutation } from '@apollo/client';
import { DELETE_VEHICLE, GET_VEHICLE_LIST } from '../../../lib/queries';

type VehicleListItemProps = {
  vehicle: Vehicle;
  setModalState: (state: boolean) => void;
};

const VehicleListItem: FC<VehicleListItemProps> = ({
  vehicle,
  setModalState,
}) => {
  const router = useRouter();
  const [deleteVehicle] = useMutation(DELETE_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  const showDefectsHandler = () => {
    router.push('/defects/' + vehicle.id);
  };

  const deleteVehicleHandler = () => {
    deleteVehicle({
      variables: {
        deleteVehicleData: {
          id: vehicle.id,
        },
      },
    });
  };

  return (
    <tr key={vehicle.id}>
      <TableDataItem>{vehicle.registration}</TableDataItem>
      <TableDataItem>{vehicle.make}</TableDataItem>
      <TableDataItem>{vehicle.model}</TableDataItem>
      <TableDataItem>{vehicle.depot.name}</TableDataItem>
      <TableDataItem>{vehicle.owner}</TableDataItem>
      <TableDataItem>
        {vehicle.fuelCard != null ? vehicle.fuelCard.cardNumber : ''}
      </TableDataItem>
      <TableDataItem>
        {vehicle.tollTag != null ? vehicle.tollTag.tagNumber : ''}
      </TableDataItem>
      <TableDataItem>{vehicle.cvrtDueDate}</TableDataItem>
      <TableDataItem>{vehicle.thirteenWeekInspectionDueDate}</TableDataItem>
      <TableDataItem>{vehicle.tachoCalibrationDueDate}</TableDataItem>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => {
            setModalState(true);
          }}
        >
          Edit
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={deleteVehicleHandler}>Delete</Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={showDefectsHandler}>Defects</Button>
      </td>
    </tr>
  );
};

export default VehicleListItem;
