import { FC, useState } from 'react';
import Button from '../../Table/Button';
import TableDataItem from '../../Table/TableDataItem';
// import { Vehicle } from './VehicleList';
import { useRouter } from 'next/router';

type VehicleProps = {
  vehicle: any;
};

const VehicleListItem: FC<VehicleProps> = ({ vehicle }) => {
  const router = useRouter();

  const showDefectsHandler = () => {
    router.push('/defects/' + vehicle.id);
  };

  return (
    <tr key={vehicle.id}>
      <TableDataItem>{vehicle.registration}</TableDataItem>
      <TableDataItem>{vehicle.make}</TableDataItem>
      <TableDataItem>{vehicle.model}</TableDataItem>
      <TableDataItem>{vehicle.depot}</TableDataItem>
      <TableDataItem>{vehicle.owner}</TableDataItem>
      <TableDataItem>{vehicle.fuelCardNumber}</TableDataItem>
      <TableDataItem>{vehicle.tollTagNumber}</TableDataItem>
      <TableDataItem>{vehicle.cvrtDueDate}</TableDataItem>
      <TableDataItem>{vehicle.thirteenWeekInspectionDate}</TableDataItem>
      <TableDataItem>{vehicle.tachoCalibrationDate}</TableDataItem>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={() => {}}>Edit</Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={showDefectsHandler}>Defects</Button>
      </td>
    </tr>
  );
};

export default VehicleListItem;
