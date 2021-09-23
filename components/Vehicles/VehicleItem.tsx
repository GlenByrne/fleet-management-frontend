import { FC } from 'react';

type VehicleProps = {
  vehicle: { id: String; registration: String };
};

const VehicleItem: FC<VehicleProps> = ({ vehicle }) => {
  return (
    <div>
      <div className="h1">{vehicle.id}</div>
      <div className="h1">{vehicle.registration}</div>
    </div>
  );
};

export default VehicleItem;
