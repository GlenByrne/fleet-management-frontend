import TableItem from 'core/Table/TableItem';
import Table from 'core/Table/Table';
import TableRow from 'core/Table/TableRow';
import { useGetVehiclesQuery, Vehicle } from 'generated/graphql';
import { VehicleUpdateModalItem } from 'constants/types';
import { currentVehicleVar } from 'constants/apollo-client';
import StackedList from './StackedList';
import Loading from 'core/Loading';

type VehicleTableData = {
  registration: JSX.Element;
  type: JSX.Element;
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
  'Type',
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
    type: <TableItem>{vehicle.type}</TableItem>,
    make: <TableItem>{vehicle.make}</TableItem>,
    model: <TableItem>{vehicle.model}</TableItem>,
    depot: (
      <TableItem>
        {vehicle.depot?.name != null ? vehicle.depot?.name : 'None'}
      </TableItem>
    ),
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

const VehicleList = () => {
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

  const { data, loading, error } = useGetVehiclesQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    // <Table
    //   columnHeaders={headers}
    //   data={data.vehicles as Vehicle[]}
    //   renderItem={(vehicle) => {
    //     return (
    //       <TableRow
    //         item={vehicle}
    //         tableData={getTableData(vehicle)}
    //         setUpdateModalState={updateVehicleModalHandler}
    //         setDeleteModalState={deleteVehicleModalHandler}
    //         changeCurrentItem={changeCurrentVehicle}
    //       />
    //     );
    //   }}
    // />
    <StackedList
      vehicles={data.vehicles as Vehicle[]}
      changeCurrentVehicle={changeCurrentVehicle}
    />
  );
};

export default VehicleList;
