import TableRow from 'core/Table/TableRow';
import Table from 'core/Table/Table';
import TableItem from 'core/Table/TableItem';
import {
  FuelCard,
  GetFuelCardsDocument,
  GetFuelCardsQuery,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useDeleteFuelCardMutation,
  useGetFuelCardsQuery,
} from 'generated/graphql';
import { FuelCardUpdateModalItem } from 'constants/types';
import { currentFuelCardVar } from 'constants/apollo-client';

type FuelCardListProps = {
  updateFuelCardModalHandler: (state: boolean) => void;
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

const FuelCardList = ({ updateFuelCardModalHandler }: FuelCardListProps) => {
  const [deleteFuelCard] = useDeleteFuelCardMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentFuelCards = cache.readQuery<GetFuelCardsQuery>({
        query: GetFuelCardsDocument,
      });
      const newFuelCards = currentFuelCards?.fuelCards?.filter((fuelCard) =>
        fuelCard != null
          ? fuelCard.id !== mutationReturn?.deleteFuelCard.id
          : currentFuelCards.fuelCards
      );
      cache.writeQuery({
        query: GetFuelCardsDocument,
        data: { fuelCards: newFuelCards },
      });
      cache.evict({
        id: mutationReturn?.deleteFuelCard.id,
      });
    },
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
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
