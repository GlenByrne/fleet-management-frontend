import { gql } from '@apollo/client';

export const GET_VEHICLE = gql`
  query GetVehicle {
    vehicle {
      id
      registration
      make
      model
      owner
      depot {
        name
      }
      fuelCard {
        cardNumber
      }
      tollTag {
        tagNumber
      }
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
    }
  }
`;

export const GET_VEHICLE_LIST = gql`
  query GetVehicleList {
    vehicles {
      id
      registration
      make
      model
      owner
      depot {
        name
      }
      fuelCard {
        cardNumber
      }
      tollTag {
        tagNumber
      }
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
    }
  }
`;

export const GET_VEHICLE_DEFECTS = gql`
  query GetVehicleDefects($defectsForVehicleVehicleId: ID!) {
    defectsForVehicle(vehicleId: $defectsForVehicleVehicleId) {
      id
      description
      dateReported
      dateCompleted
      status
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_ADD_VEHICLE = gql`
  query GetSelectableItemsForAddVehicle {
    fuelCardsNotAssigned {
      id
      cardNumber
    }
    tollTags {
      id
      tagNumber
    }
    depots {
      id
      name
    }
  }
`;

export const GET_ITEMS_FOR_UPDATE_VEHICLE = gql`
  query GetItemsForUpdateVehicle($vehicleId: ID!) {
    vehicle(vehicleId: $vehicleId) {
      id
      registration
      make
      model
      owner
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
      depot {
        id
        name
      }
      fuelCard {
        id
        cardNumber
      }
      tollTag {
        id
        tagNumber
      }
    }
    currentFuelCardAndUnassigned(vehicleId: $vehicleId) {
      id
      cardNumber
    }
    tollTags {
      id
      tagNumber
    }
    depots {
      id
      name
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_ADD_TOLL_TAG = gql`
  query GetSelectableItemsForAddTollTag {
    depots {
      id
      name
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_ADD_FUEL_CARD = gql`
  query GetSelectableItemsForAddFuelCard {
    depots {
      id
      name
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_UPDATE_FUEL_CARD = gql`
  query GetSelectableItemsForUpdateFuelCard {
    depots {
      id
      name
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_UPDATE_TOLL_TAG = gql`
  query GetSelectableItemsForUpdateTollTag {
    depots {
      id
      name
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation AddVehicle($addVehicleData: AddVehicleInput!) {
    addVehicle(data: $addVehicleData) {
      id
      registration
      make
      model
      owner
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
      depot {
        name
        id
      }
      fuelCard {
        id
        cardNumber
      }
      tollTag {
        id
        tagNumber
      }
    }
  }
`;

export const ADD_TOLL_TAG = gql`
  mutation AddTollTag($addTollTagData: AddTollTagInput!) {
    addTollTag(data: $addTollTagData) {
      id
      tagNumber
      tagProvider
      depot {
        id
        name
      }
    }
  }
`;

export const ADD_FUEL_CARD = gql`
  mutation AddFuelCard($addFuelCardData: AddFuelCardInput!) {
    addFuelCard(data: $addFuelCardData) {
      id
      cardNumber
      cardProvider
      depot {
        id
        name
      }
    }
  }
`;

export const GET_FUEL_CARDS = gql`
  query GetFuelCards {
    fuelCards {
      id
      cardNumber
      cardProvider
      depot {
        id
        name
      }
      vehicle {
        id
        registration
      }
    }
  }
`;

export const GET_TOLL_TAGS = gql`
  query GetTollTags {
    tollTags {
      id
      tagNumber
      tagProvider
      depot {
        id
        name
      }
      vehicle {
        id
        registration
      }
    }
  }
`;

export const DELETE_FUEL_CARD = gql`
  mutation DeleteFuelCard($deleteFuelCardData: DeleteFuelCardInput!) {
    deleteFuelCard(data: $deleteFuelCardData) {
      cardNumber
    }
  }
`;

export const DELETE_TOLL_TAG = gql`
  mutation DeleteTollTag($deleteTollTagData: DeleteTollTagInput!) {
    deleteTollTag(data: $deleteTollTagData) {
      tagNumber
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($deleteVehicleData: DeleteVehicleInput!) {
    deleteVehicle(data: $deleteVehicleData) {
      id
      registration
    }
  }
`;

export const UPDATE_FUEL_CARD = gql`
  mutation UpdateFuelCard($updateFuelCardData: UpdateFuelCardInput!) {
    updateFuelCard(data: $updateFuelCardData) {
      id
      cardNumber
      cardProvider
      depot {
        id
        name
      }
    }
  }
`;

export const UPDATE_TOLL_TAG = gql`
  mutation UpdateTollTag($updateTollTagData: UpdateTollTagInput!) {
    updateTollTag(data: $updateTollTagData) {
      id
      tagNumber
      tagProvider
      depot {
        id
        name
      }
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($updateVehicleData: UpdateVehicleInput!) {
    updateVehicle(data: $updateVehicleData) {
      id
      registration
      make
      model
      owner
      cvrtDueDate
      thirteenWeekInspectionDueDate
      tachoCalibrationDueDate
      depot {
        id
        name
      }
      fuelCard {
        id
        cardNumber
      }
      tollTag {
        id
        tagNumber
      }
    }
  }
`;
