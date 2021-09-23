import VehicleItem from './VehicleItem';
import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';

const QUERY = gql`
  query Vehicles {
    vehicles {
      id
      registration
    }
  }
`;

type Vehicle = {
  id: string;
  registration: string;
};

const Vehicles = () => {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  return (
    <div className="flex flex-col">
      {data.vehicles.map((vehicle: any) => (
        <VehicleItem key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default Vehicles;
