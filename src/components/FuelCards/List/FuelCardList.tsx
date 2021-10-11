import { useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { GET_FUEL_CARDS } from 'constants/queries';
import { FuelCard } from 'constants/types';
import TableRow from 'core/Table/TableRow';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';

interface FuelCardData {
  fuelCards: FuelCard[];
}

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
    depot: <TableItem>{fuelCard.depot.name}</TableItem>,
    vehicle: (
      <TableItem>
        {fuelCard.vehicle != null ? fuelCard.vehicle.registration : 'None'}
      </TableItem>
    ),
  };

  return tableData;
};

const FuelCardList: FC = () => {
  const [open, setOpen] = useState(false);

  const updateFuelCardModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const { data, loading, error } = useQuery<FuelCardData>(GET_FUEL_CARDS, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table
      columnHeaders={headers}
      data={data?.fuelCards}
      renderItem={(item: FuelCard) => {
        return (
          <TableRow
            item={item}
            tableData={getTableData(item)}
            setModalState={updateFuelCardModalHandler}
          />
        );
      }}
    />
  );
};

export default FuelCardList;
