import { gql } from '@apollo/client';

export const GET_VEHICLE = gql`
  query GetVehicle($vehicleId: ID!) {
    vehicle(vehicleId: $vehicleId) {
      id
      type
      registration
      make
      model
      owner
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
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
    }
  }
`;

export const GET_VEHICLES = gql`
  query GetVehicles($data: VehicleInputFilter) {
    vehicles(data: $data) {
      id
      type
      registration
      make
      model
      owner
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
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
    }
  }
`;

export const GET_VEHICLE_DEFECTS = gql`
  query GetVehicleDefects($vehicleId: ID!) {
    defectsForVehicle(vehicleId: $vehicleId) {
      id
      description
      dateReported
      dateCompleted
      status
    }
  }
`;

export const GET_VEHICLES_UPCOMING_CVRT = gql`
  query UpcomingCVRT {
    upcomingCVRT {
      id
      registration
      cvrt {
        id
        dueDate
      }
    }
  }
`;

export const GET_VEHICLES_UPCOMING_THIRTEEN_WEEK = gql`
  query UpcomingThirteenWeek {
    upcomingThirteenWeek {
      id
      registration
      thirteenWeekInspection {
        id
        dueDate
      }
    }
  }
`;

export const GET_VEHICLES_UPCOMING_TACHO_CALIBRATION = gql`
  query UpcomingTachoCalibration {
    upcomingTachoCalibration {
      id
      registration
      tachoCalibration {
        id
        dueDate
      }
    }
  }
`;

export const GET_FUEL_CARDS = gql`
  query GetFuelCards($data: FuelCardInputFilter) {
    fuelCards(data: $data) {
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
  query GetTollTags($data: TollTagInputFilter) {
    tollTags(data: $data) {
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

export const GET_DEPOTS = gql`
  query GetDepots($data: DepotInputFilter) {
    depots(data: $data) {
      id
      name
      vehicles {
        id
        registration
      }
      fuelCards {
        id
        cardNumber
      }
      tollTags {
        id
        tagNumber
      }
    }
  }
`;

export const GET_SELECTABLE_ITEMS_FOR_ADD_VEHICLE = gql`
  query GetSelectableItemsForAddVehicle {
    fuelCardsNotAssigned {
      id
      cardNumber
    }
    tollTagsNotAssigned {
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
  query GetItemsForUpdateVehicle {
    fuelCardsNotAssigned {
      id
      cardNumber
    }
    tollTagsNotAssigned {
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

export const GET_SELECTABLE_ITEMS_FOR_ADD_USER = gql`
  query GetSelectableItemsForAddUser {
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

export const GET_SELECTABLE_ITEMS_FOR_UPDATE_USER = gql`
  query GetSelectableItemsForUpdateUser {
    depots {
      id
      name
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation AddVehicle($data: AddVehicleInput!) {
    addVehicle(data: $data) {
      id
      type
      registration
      make
      model
      owner
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
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

export const ADD_TOLL_TAG = gql`
  mutation AddTollTag($data: AddTollTagInput!) {
    addTollTag(data: $data) {
      id
      tagNumber
      tagProvider
      vehicle {
        id
        registration
      }
      depot {
        id
        name
      }
    }
  }
`;

export const ADD_FUEL_CARD = gql`
  mutation AddFuelCard($data: AddFuelCardInput!) {
    addFuelCard(data: $data) {
      id
      cardNumber
      cardProvider
      vehicle {
        id
        registration
      }
      depot {
        id
        name
      }
    }
  }
`;

export const ADD_DEPOT_CARD = gql`
  mutation AddDepot($data: AddDepotInput!) {
    addDepot(data: $data) {
      id
      name
    }
  }
`;

export const DELETE_FUEL_CARD = gql`
  mutation DeleteFuelCard($data: DeleteFuelCardInput!) {
    deleteFuelCard(data: $data) {
      id
      cardNumber
    }
  }
`;

export const DELETE_TOLL_TAG = gql`
  mutation DeleteTollTag($data: DeleteTollTagInput!) {
    deleteTollTag(data: $data) {
      id
      tagNumber
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($data: DeleteVehicleInput!) {
    deleteVehicle(data: $data) {
      id
      registration
    }
  }
`;

export const DELETE_DEPOT = gql`
  mutation DeleteDepot($data: DeleteDepotInput!) {
    deleteDepot(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_FUEL_CARD = gql`
  mutation UpdateFuelCard($data: UpdateFuelCardInput!) {
    updateFuelCard(data: $data) {
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
  mutation UpdateTollTag($data: UpdateTollTagInput!) {
    updateTollTag(data: $data) {
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
  mutation UpdateVehicle($data: UpdateVehicleInput!) {
    updateVehicle(data: $data) {
      id
      type
      registration
      make
      model
      owner
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
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

export const UPDATE_VEHICLE_CVRT = gql`
  mutation UpdateVehicleCVRT($data: UpdateVehicleDates!) {
    updateVehicleCVRT(data: $data) {
      id
      type
      registration
      make
      model
      owner
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
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

export const UPDATE_VEHICLE_THIRTEEN_WEEK_INSPECTION = gql`
  mutation UpdateVehicleThirteenWeekInspection(
    $data: UpdateVehicleDatesWithCompletion!
  ) {
    updateVehicleThirteenWeekInspection(data: $data) {
      id
      type
      registration
      make
      model
      owner
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
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

export const UPDATE_VEHICLE_TACHO_CALIBRATION = gql`
  mutation UpdateVehicleTachoCalibration(
    $data: UpdateVehicleDatesWithCompletion!
  ) {
    updateVehicleTachoCalibration(data: $data) {
      id
      type
      registration
      make
      model
      owner
      cvrt {
        id
        dueDate
      }
      thirteenWeekInspection {
        id
        dueDate
        previousDate
      }
      tachoCalibration {
        id
        dueDate
        previousDate
      }
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

export const UPDATE_DEPOT = gql`
  mutation UpdateDepot($data: UpdateDepotInput!) {
    updateDepot(data: $data) {
      id
      name
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
      role
      depot {
        id
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        email
        name
        role
        depot {
          id
          name
        }
      }
      token
    }
  }
`;

// export const REGISTER = gql`
//   mutation Register($data: RegisterInput!) {
//     register(data: $data) {
//       user {
//         id
//         name
//         email
//         role
//         company {
//           id
//           name
//         }
//         depot {
//           id
//           name
//         }
//       }
//       token
//     }
//   }
// `;

export const ADD_COMPANY = gql`
  mutation AddCompany($data: AddCompanyInput!) {
    addCompany(data: $data) {
      company {
        id
        name
      }
      user {
        id
        name
      }
      token
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($data: UsersInputFilter) {
    users(data: $data) {
      id
      name
      email
      role
      depot {
        id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($data: AddUserInput!) {
    addUser(data: $data) {
      id
      name
      email
      role
      depot {
        id
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      role
      depot {
        id
        name
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($data: DeleteUserInput!) {
    deleteUser(data: $data) {
      id
      name
    }
  }
`;
