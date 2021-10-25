import TableRow from 'core/Table/TableRow';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';
import { FuelCard, useGetFuelCardsQuery } from 'generated/graphql';
import { FuelCardUpdateModalItem } from 'constants/types';
import { currentFuelCardVar } from 'constants/apollo-client';

type FuelCardListProps = {
  updateFuelCardModalHandler: (state: boolean) => void;
  deleteFuelCardModalHandler: (state: boolean) => void;
};

type FuelCardTableData = {
  cardNumber: JSX.Element;
  cardProvider: JSX.Element;
  depot: JSX.Element;
  vehicle?: JSX.Element;
};

const headers: string[] = [
  'Card Number',
  'Provider',
  'Depot',
  'Vehicle',
  '',
  '',
];

const getTableData = (fuelCard: FuelCard) => {
  const tableData: FuelCardTableData = {
    cardNumber: <TableItem>{fuelCard.cardNumber}</TableItem>,
    cardProvider: <TableItem>{fuelCard.cardProvider}</TableItem>,
    depot: (
      <TableItem>
        {fuelCard.depot != null ? fuelCard.depot.name : 'None'}
      </TableItem>
    ),
    vehicle: (
      <TableItem>
        {fuelCard.vehicle != null ? fuelCard.vehicle.registration : 'None'}
      </TableItem>
    ),
  };

  return tableData;
};

const FuelCardList = ({
  updateFuelCardModalHandler,
  deleteFuelCardModalHandler,
}: FuelCardListProps) => {
  const changeCurrentFuelCard = (fuelCard: FuelCard) => {
    const chosenFuelCard: FuelCardUpdateModalItem = {
      id: fuelCard.id,
      cardNumber: fuelCard.cardNumber,
      cardProvider: fuelCard.cardProvider,
      depot: {
        id: fuelCard.depot != null ? fuelCard.depot.id : '',
        name: fuelCard.depot != null ? fuelCard.depot.name : '',
      },
    };
    currentFuelCardVar(chosenFuelCard);
  };

  const { data, loading, error } = useGetFuelCardsQuery();

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
      data={data.fuelCards as FuelCard[]}
      renderItem={(item: FuelCard) => {
        return (
          <TableRow
            item={item}
            tableData={getTableData(item)}
            setUpdateModalState={updateFuelCardModalHandler}
            setDeleteModalState={deleteFuelCardModalHandler}
            changeCurrentItem={changeCurrentFuelCard}
          />
        );
      }}
    />
  );
};

export default FuelCardList;
