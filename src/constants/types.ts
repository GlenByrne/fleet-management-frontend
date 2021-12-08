import {
  DefectStatus,
  InfringementStatus,
  Role,
  VehicleType,
} from '@/generated/graphql';

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
  value: string | null;
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
};

export type TollTagUpdateModalItem = {
  id: string;
  tagNumber: string;
  tagProvider: string;
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

export type DefectUpdateModalItem = {
  id: string;
  description: string;
  dateReported: Date;
  reporter: string;
  dateCompleted?: Date | null;
  status: DefectStatus;
};

export type InfringementUpdateModalItem = {
  id: string;
  description: string;
  dateOccured: Date;
  status: InfringementStatus;
};

export enum DateStatus {
  OUT_OF_DATE,
  UPCOMING_NEXT_14_DAYS,
  NOT_SOON,
  NONE,
}
