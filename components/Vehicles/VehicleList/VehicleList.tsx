import VehicleListItem from './VehicleListItem';
import { useQuery } from '@apollo/client';
import { FC } from 'react';
import Table from '../../Table/Table';
import TableColumnHeader from '../../Table/TableColumnHeader';
import { GET_VEHICLE_LIST } from '../../../lib/queries';
import { Vehicle } from '../Vehicles.types';
import Button from '../../Table/Button';

type VehicleListProps = {
  setModalState: (state: boolean) => void;
};

const VehicleList: FC<VehicleListProps> = ({ setModalState }) => {
  const { data, loading, error } = useQuery(GET_VEHICLE_LIST, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table>
      <thead className="bg-gray-50">
        <tr>
          <TableColumnHeader>Registration</TableColumnHeader>
          <TableColumnHeader>Make</TableColumnHeader>
          <TableColumnHeader>Model</TableColumnHeader>
          <TableColumnHeader>Depot</TableColumnHeader>
          <TableColumnHeader>Owner</TableColumnHeader>
          <TableColumnHeader>Fuel Card</TableColumnHeader>
          <TableColumnHeader>Toll Tag</TableColumnHeader>
          <TableColumnHeader>CVRT Due Date</TableColumnHeader>
          <TableColumnHeader>13 Week Inspection</TableColumnHeader>
          <TableColumnHeader>Tacho Calibration</TableColumnHeader>
          <TableColumnHeader>{}</TableColumnHeader>
          <TableColumnHeader>{}</TableColumnHeader>
          <TableColumnHeader>
            <Button
              onClick={() => {
                setModalState(true);
              }}
            >
              Add Vehicle
            </Button>
          </TableColumnHeader>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.vehicles.length > 0 ? (
          data.vehicles.map((vehicle: Vehicle) => (
            <VehicleListItem key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <tr>
            <td colSpan={12} className="text-2xl text-center">
              No Vehicles Found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VehicleList;
