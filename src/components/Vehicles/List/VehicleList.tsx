import TableItem from 'core/Table/TableItem';
import Table from 'core/Table/Table';
import TableRow from 'core/Table/TableRow';
import {
  GetVehiclesDocument,
  GetVehiclesQuery,
  useDeleteVehicleMutation,
  useGetVehiclesQuery,
  Vehicle,
} from 'generated/graphql';

type VehicleListProps = {
  updateVehicleModalHandler: (state: boolean) => void;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
};

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

const VehicleList = ({
  updateVehicleModalHandler,
  changeCurrentVehicle,
}: VehicleListProps) => {
  const [deleteVehicle] = useDeleteVehicleMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentVehicles = cache.readQuery<GetVehiclesQuery>({
        query: GetVehiclesDocument,
      });

      const newVehicles = currentVehicles?.vehicles?.filter((vehicle) =>
        vehicle != null
          ? vehicle.id !== mutationReturn?.deleteVehicle.id
          : currentVehicles.vehicles
      );

      cache.writeQuery({
        query: GetVehiclesDocument,
        data: { vehicles: newVehicles },
      });

      cache.evict({
        id: mutationReturn?.deleteVehicle.id,
      });
    },
  });
  // const [deleteVehicle] = useMutation<DeleteVehicle>(DELETE_VEHICLE, {
  //   update: (cache, { data: mutationReturn }) => {
  //     const currentVehicles = cache.readQuery<GetVehicles>({
  //       query: GET_VEHICLES,
  //     });

  //     const newVehicles = currentVehicles?.vehicles.filter(
  //       (vehicle) => vehicle.id !== mutationReturn?.deleteVehicle.id
  //     );

  //     cache.writeQuery({
  //       query: GET_VEHICLES,
  //       data: { vehicles: newVehicles },
  //     });

  //     cache.evict({
  //       id: mutationReturn?.deleteVehicle.id,
  //     });
  //   },
  // });

  const deleteVehicleHandler = (id: string) => {
    deleteVehicle({
      variables: {
        deleteVehicleData: {
          id: id,
        },
      },
    });
  };

  const { data, loading, error } = useGetVehiclesQuery();
  // const { data, loading, error } = useQuery<VehicleData>(GET_VEHICLES, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Table
      columnHeaders={headers}
      data={data.vehicles as Vehicle[]}
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
