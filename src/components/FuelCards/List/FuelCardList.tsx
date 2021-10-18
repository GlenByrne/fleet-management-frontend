import { useMutation, useQuery } from '@apollo/client';
import { DELETE_FUEL_CARD, GET_FUEL_CARDS } from 'constants/queries';
import { DeleteFuelCard, FuelCard, GetFuelCards } from 'constants/types';
import TableRow from 'core/Table/TableRow';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';

type FuelCardListProps = {
  updateFuelCardModalHandler: (state: boolean) => void;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
};

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

const FuelCardList = ({
  updateFuelCardModalHandler,
  changeCurrentFuelCard,
}: FuelCardListProps) => {
  const [deleteFuelCard] = useMutation<DeleteFuelCard>(DELETE_FUEL_CARD, {
    update: (cache, { data: mutationReturn }) => {
      const currentFuelCards = cache.readQuery<GetFuelCards>({
        query: GET_FUEL_CARDS,
      });

      const newFuelCards = currentFuelCards?.fuelCards.filter(
        (fuelCard) => fuelCard.id !== mutationReturn?.deleteFuelCard.id
      );

      cache.writeQuery({
        query: GET_FUEL_CARDS,
        data: { fuelCards: newFuelCards },
      });

      cache.evict({
        id: mutationReturn?.deleteFuelCard.id,
      });
    },
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
            changeCurrentItem={changeCurrentFuelCard}
          />
        );
      }}
    />
  );
};

export default FuelCardList;
