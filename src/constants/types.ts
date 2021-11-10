import { Role, VehicleType } from 'generated/graphql';

export type NavbarOption = {
  name: string;
  href: string;
  icon: any;
};

export type UserNavbarOption = {
  name: string;
  href?: string;
  onClick?: () => void;
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

export type VehicleUpdateModalItem = {
  id: string;
  type: VehicleType;
  registration: string;
  make: string;
  model: string;
  owner: string;
  cvrt: Date;
  thirteenWeekInspection: Date;
  tachoCalibration: Date;
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

export type UserUpdateModalItem = {
  id: string;
  email: string;
  role: Role;
  name: string;
  depot: {
    id: string;
    name: string;
  } | null;
};

export enum DateStatus {
  OUT_OF_DATE,
  UPCOMING_NEXT_14_DAYS,
  NOT_SOON,
  NONE,
}
