import { useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { GET_VEHICLE_LIST } from '../../../constants/queries';
import { Vehicle } from '../../../constants/types';
import TableItem from '../../../core/Table/TableItem';
import Table from '../../../core/Table/Table';
import TableRow from '../../../core/Table/TableRow';

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

const VehicleList: FC = () => {
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
  );
};

export default VehicleList;
