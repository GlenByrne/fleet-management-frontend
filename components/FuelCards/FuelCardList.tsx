import { useQuery } from '@apollo/client';
import { FC } from 'react';
import Table from '../Table/Table';
import TableColumnHeader from '../Table/TableColumnHeader';
import { GET_FUEL_CARDS } from '../../lib/queries';
import { FuelCard } from '../Vehicles/Vehicles.types';
import Button from '../Table/Button';
import FuelCardListItem from './FuelCardListItem';

const FuelCardList: FC = () => {
  const { data, loading, error } = useQuery(GET_FUEL_CARDS, {});

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <Table>
      <thead className="bg-gray-50">
        <tr>
          <TableColumnHeader>Card Number</TableColumnHeader>
          <TableColumnHeader>Provider</TableColumnHeader>
          <TableColumnHeader>Depot</TableColumnHeader>
          <TableColumnHeader>Assigned Vehicle</TableColumnHeader>
          <TableColumnHeader>{}</TableColumnHeader>
          <TableColumnHeader>
            <Button onClick={() => {}}>Add Card</Button>
          </TableColumnHeader>
        </tr>
      </thead>

      {data.fuelCards.length === 0 ? (
        <h1 className="text-center">No Fuel Cards Found</h1>
      ) : (
        <tbody className="bg-white divide-y divide-gray-200">
          {data.fuelCards.map((fuelCard: FuelCard) => (
            <FuelCardListItem key={fuelCard.id} fuelCard={fuelCard} />
          ))}
        </tbody>
      )}
    </Table>
  );
};

export default FuelCardList;
