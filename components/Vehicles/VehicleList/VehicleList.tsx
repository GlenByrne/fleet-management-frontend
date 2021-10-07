import VehicleListItem from './VehicleListItem';
import { useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import Table from '../../Table/Table';
import TableColumnHeader from '../../Table/TableColumnHeader';
import { GET_VEHICLE_LIST } from '../../../lib/queries';
import { Vehicle } from '../../../lib/types';
import Button from '../../Table/Button';
import UpdateVehicleModal from './UpdateVehicleModal';

type VehicleListProps = {
  setModalState: (state: boolean) => void;
};

const VehicleList: FC<VehicleListProps> = ({ setModalState }) => {
  const [open, setOpen] = useState(false);

  const updateVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const { data, loading, error } = useQuery(GET_VEHICLE_LIST, {});

  const headings = [
    { child: 'Registration' },
    { child: 'Make' },
    { child: 'Modal' },
    { child: 'Depot' },
    { child: 'Owner' },
    { child: 'Fuel Card' },
    { child: 'Toll Tag' },
    { child: 'CVRT' },
    { child: '13 Week Inspection' },
    { child: 'Tacho Calibration' },
    { child: '' },
    { child: '' },

    {
      child: (
        <Button
          onClick={() => {
            setModalState(true);
          }}
        >
          Add Vehicle
        </Button>
      ),
    },
  ];

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
          {headings.map((heading, index) => {
            return (
              <TableColumnHeader key={index}>{heading.child}</TableColumnHeader>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.vehicles.length > 0 ? (
          data.vehicles.map((vehicle: Vehicle) => (
            <Fragment key={vehicle.id}>
              <VehicleListItem
                vehicle={vehicle}
                setModalState={updateVehicleModalHandler}
              />
              <UpdateVehicleModal
                modalState={open}
                setModalState={updateVehicleModalHandler}
                vehicle={vehicle}
              />
            </Fragment>
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
