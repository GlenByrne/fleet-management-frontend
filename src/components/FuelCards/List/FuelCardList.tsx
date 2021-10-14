import { useMutation, useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import { DELETE_FUEL_CARD, GET_FUEL_CARDS } from 'constants/queries';
import { FuelCard } from 'constants/types';
import TableRow from 'core/Table/TableRow';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';
import UpdateFuelCardModal from '../Modal/Update/UpdateFuelCardModal';

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
  const [deleteFuelCard] = useMutation(DELETE_FUEL_CARD, {
    refetchQueries: [GET_FUEL_CARDS, 'GetFuelCards'],
  });

  const deleteCardHandler = (id: string) => {
    deleteFuelCard({
      variables: {
        deleteFuelCardData: {
          id: id,
        },
      },
    });
  };

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
            deleteItemHandler={deleteCardHandler}
          />
        );
      }}
    />
  );
};

export default FuelCardList;
