import { useMutation, useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import { DELETE_VEHICLE, GET_VEHICLE_LIST } from 'constants/queries';
import { Vehicle } from 'constants/types';
import TableItem from 'core/Table/TableItem';
import Table from 'core/Table/Table';
import TableRow from 'core/Table/TableRow';
import UpdateVehicleModal from '../Modal/Update/UpdateVehicleModal';

type VehicleListProps = {
  updateVehicleModalHandler: (state: boolean) => void;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
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
    model: <TableItem>{vehicle.model}</TableItem>,
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

const VehicleList = ({
  updateVehicleModalHandler,
  changeCurrentVehicle,
}: VehicleListProps) => {
  const [deleteVehicle] = useMutation(DELETE_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  const deleteVehicleHandler = (id: string) => {
    deleteVehicle({
      variables: {
        deleteVehicleData: {
          id: id,
        },
      },
    });
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
      renderItem={(vehicle) => {
        return (
          <TableRow
            item={vehicle}
            tableData={getTableData(vehicle)}
            setModalState={updateVehicleModalHandler}
            deleteItemHandler={deleteVehicleHandler}
            changeCurrentItem={changeCurrentVehicle}
          />
        );
      }}
    />
  );
};

export default VehicleList;
