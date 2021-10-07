import { FC } from 'react';
import Button from '../Table/Button';
import TableDataItem from '../Table/TableDataItem';
import { FuelCard } from '../../lib/types';
import { useMutation } from '@apollo/client';
import { DELETE_FUEL_CARD, GET_FUEL_CARDS } from '../../lib/queries';

type FuelCardListItemProps = {
  fuelCard: FuelCard;
  setModalState: (state: boolean) => void;
};

const FuelCardListItem: FC<FuelCardListItemProps> = ({
  fuelCard,
  setModalState,
}) => {
  const [deleteFuelCard] = useMutation(DELETE_FUEL_CARD, {
    refetchQueries: [GET_FUEL_CARDS, 'GetFuelCards'],
  });

  const deleteCardHandler = () => {
    deleteFuelCard({
      variables: {
        deleteFuelCardData: {
          id: fuelCard.id,
        },
      },
    });
  };

  return (
    <tr key={fuelCard.id}>
      <TableDataItem>{fuelCard.cardNumber}</TableDataItem>
      <TableDataItem>{fuelCard.cardProvider}</TableDataItem>
      <TableDataItem>{fuelCard.depot.name}</TableDataItem>
      <TableDataItem>
        {fuelCard.vehicle != null ? fuelCard.vehicle.registration : 'None'}
      </TableDataItem>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button
          onClick={() => {
            setModalState(true);
          }}
        >
          Edit
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Button onClick={deleteCardHandler}>Delete</Button>
      </td>
    </tr>
  );
};

export default FuelCardListItem;
