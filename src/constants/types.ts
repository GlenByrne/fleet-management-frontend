export type Vehicle = {
  id: string;
  registration: string;
  make: string;
  model: string;
  owner: string;
  cvrtDueDate: Date;
  tachoCalibrationDueDate: Date;
  thirteenWeekInspectionDueDate: Date;
  defects: Defect[];
  depot: Depot;
  fuelCard: FuelCard;
  tollTag: TollTag;
};

export type Depot = {
  id: string;
  name: string;
  vehicles: Vehicle[];
};

export type FuelCard = {
  id: string;
  cardNumber: string;
  cardProvider: string;
  depot: Depot;
  vehicle: Vehicle;
};

export type TollTag = {
  id: string;
  tagNumber: string;
  tagProvider: string;
  depot: Depot;
  vehicle: Vehicle;
};

export type Defect = {
  dateCompleted: Date;
  dateReported: Date;
  description: string;
  id: string;
  status: string;
};

export type NavbarOption = {
  name: string;
  href: string;
};

export type TableData = {
  data: string | number | Date;
  wrapper: JSX.Element;
};

export interface IdObj {
  id: string;
}

export type Option = {
  value: string;
  label: string;
};

export type UpdateVehicleModalData = {
  id: string;
  registration: string;
  make: string;
  model: string;
  owner: string;
  cvrtDueDate: Date;
  tachoCalibrationDueDate: Date;
  thirteenWeekInspectionDueDate: Date;
  defects: Defect[];
  depot: Depot;
  fuelCard: FuelCard;
  tollTag: TollTag;
};

export type VehicleUpdateModalItem = {
  id: string;
  registration: string;
  make: string;
  model: string;
  owner: string;
  cvrtDueDate: Date;
  tachoCalibrationDueDate: Date;
  thirteenWeekInspectionDueDate: Date;
  depot: {
    id: string;
    name: string;
  };
  fuelCard: {
    id: string;
    cardNumber: string;
  };
  tollTag: {
    id: string;
    tagNumber: string;
  };
};

export type FuelCardUpdateModalItem = {
  id: string;
  cardNumber: string;
  cardProvider: string;
  depot: {
    id: string;
    name: string;
  };
};

export type TollTagUpdateModalItem = {
  id: string;
  tagNumber: string;
  tagProvider: string;
  depot: {
    id: string;
    name: string;
  };
};

export type AddFuelCard = {
  addFuelCard: FuelCard;
};

export type GetFuelCards = {
  fuelCards: FuelCard[];
};

export type DeleteFuelCard = {
  deleteFuelCard: FuelCard;
};

export type AddTollTag = {
  addTollTag: TollTag;
};

export type GetTollTags = {
  tollTags: TollTag[];
};

export type DeleteTollTag = {
  deleteTollTag: TollTag;
};

export type AddVehicle = {
  addVehicle: Vehicle;
};

export type GetVehicles = {
  vehicles: Vehicle[];
};

export type DeleteVehicle = {
  deleteVehicle: Vehicle;
};
