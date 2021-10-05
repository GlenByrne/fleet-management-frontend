import { useQuery } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import Table from '../Table/Table';
import TableColumnHeader from '../Table/TableColumnHeader';
import { GET_FUEL_CARDS } from '../../lib/queries';
import { FuelCard } from '../Vehicles/Vehicles.types';
import Button from '../Table/Button';
import FuelCardListItem from './FuelCardListItem';
import UpdateFuelCardModal from './UpdateFuelCardModal';

type FuelCardListProps = {
  setModalState: (state: boolean) => void;
};

const FuelCardList: FC<FuelCardListProps> = ({ setModalState }) => {
  const [open, setOpen] = useState(false);

  const updateFuelCardModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const { data, loading, error } = useQuery(GET_FUEL_CARDS, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Fragment>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <TableColumnHeader>Card Number</TableColumnHeader>
            <TableColumnHeader>Provider</TableColumnHeader>
            <TableColumnHeader>Depot</TableColumnHeader>
            <TableColumnHeader>Assigned Vehicle</TableColumnHeader>
            <TableColumnHeader>{}</TableColumnHeader>
            <TableColumnHeader>
              <Button
                onClick={() => {
                  setModalState(true);
                }}
              >
                Add Card
              </Button>
            </TableColumnHeader>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.fuelCards.length > 0 ? (
            data.fuelCards.map((fuelCard: FuelCard) => (
              <Fragment key={fuelCard.id}>
                <FuelCardListItem
                  fuelCard={fuelCard}
                  setModalState={updateFuelCardModalHandler}
                />
                <UpdateFuelCardModal
                  modalState={open}
                  setModalState={updateFuelCardModalHandler}
                  fuelCard={fuelCard}
                />
              </Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-2xl text-center">
                No Fuel Cards Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default FuelCardList;
