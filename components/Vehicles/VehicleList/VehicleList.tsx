import { useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import TableColumnHeader from '../../Table/TableHeader';
import { GET_VEHICLE_LIST } from '../../../lib/queries';
import { Vehicle } from '../../../lib/types';
import Button from '../../Table/Button';
import UpdateVehicleModal from './UpdateVehicleModal';
import TableItem from '../../Table/TableItem';
import Table from '../../Table/Table';
import TableRow from '../../Table/TableRow';

type VehicleListProps = {
  setModalState: (state: boolean) => void;
};

interface VehicleData {
  vehicles: Vehicle[];
}

type VehicleTableData = {
  registration: JSX.Element;
  make: JSX.Element;
  model: JSX.Element;
  depot: JSX.Element;
  owner: JSX.Element;
  fuelCard?: JSX.Element;
  tollTag?: JSX.Element;
  cvrt: JSX.Element;
  thirteenWeek: JSX.Element;
  tachoCalibration: JSX.Element;
};

const headers: string[] = [
  'Registration',
  'Make',
  'Model',
  'Depot',
  'Owner',
  'Fuel Card',
  'Toll Tag',
  'CVRT',
  '13 Week',
  'Tacho Calibration',
  '',
  '',
];

const getTableData = (vehicle: Vehicle) => {
  const tableData: VehicleTableData = {
    registration: <TableItem>{vehicle.registration}</TableItem>,
    make: <TableItem>{vehicle.make}</TableItem>,
    model: <TableItem>{vehicle.registration}</TableItem>,
    depot: <TableItem>{vehicle.depot.name}</TableItem>,
    owner: <TableItem>{vehicle.owner}</TableItem>,
    fuelCard: (
      <TableItem>
        {vehicle.fuelCard != null ? vehicle.fuelCard.cardNumber : 'None'}
      </TableItem>
    ),
    tollTag: (
      <TableItem>
        {vehicle.tollTag != null ? vehicle.tollTag.tagNumber : 'None'}
      </TableItem>
    ),
    cvrt: <TableItem>{vehicle.cvrtDueDate}</TableItem>,
    thirteenWeek: (
      <TableItem>{vehicle.thirteenWeekInspectionDueDate}</TableItem>
    ),
    tachoCalibration: <TableItem>{vehicle.tachoCalibrationDueDate}</TableItem>,
  };

  return tableData;
};

const VehicleList: FC<VehicleListProps> = ({ setModalState }) => {
  const [open, setOpen] = useState(false);

  const updateVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const { data, loading, error } = useQuery<VehicleData>(GET_VEHICLE_LIST, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table
      columnHeaders={headers}
      data={data?.vehicles}
      renderItem={(item) => {
        return (
          <TableRow
            item={item}
            tableData={getTableData(item)}
            setModalState={updateVehicleModalHandler}
          />
        );
      }}
    />
    // <Table>
    //   <thead className="bg-gray-50">
    //     <tr>
    //       {headings.map((heading, index) => {
    //         return (
    //           <TableColumnHeader key={index}>{heading.child}</TableColumnHeader>
    //         );
    //       })}
    //     </tr>
    //   </thead>
    //   <tbody className="bg-white divide-y divide-gray-200">
    //     {data.vehicles.length > 0 ? (
    //       data.vehicles.map((vehicle: Vehicle) => (
    //         <Fragment key={vehicle.id}>
    //           <VehicleListItem
    //             vehicle={vehicle}
    //             setModalState={updateVehicleModalHandler}
    //           />
    //           <UpdateVehicleModal
    //             modalState={open}
    //             setModalState={updateVehicleModalHandler}
    //             vehicle={vehicle}
    //           />
    //         </Fragment>
    //       ))
    //     ) : (
    //       <tr>
    //         <td colSpan={12} className="text-2xl text-center">
    //           No Vehicles Found
    //         </td>
    //       </tr>
    //     )}
    //   </tbody>
    // </Table>
  );
};

export default VehicleList;
