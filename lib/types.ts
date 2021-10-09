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
