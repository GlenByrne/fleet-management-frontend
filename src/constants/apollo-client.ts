import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Role, VehicleType } from 'generated/graphql';
import {
  DepotUpdateModalItem,
  FuelCardUpdateModalItem,
  TollTagUpdateModalItem,
  UserUpdateModalItem,
  VehicleUpdateModalItem,
} from './types';

const initialFuelCard: FuelCardUpdateModalItem = {
  id: '',
  cardNumber: '',
  cardProvider: '',
  depot: {
    id: '',
    name: 'None',
  },
};

const initialTollTag: TollTagUpdateModalItem = {
  id: '',
  tagNumber: '',
  tagProvider: '',
  depot: {
    id: '',
    name: 'None',
  },
};

const initialVehicle: VehicleUpdateModalItem = {
  id: '',
  type: VehicleType.Van,
  registration: '',
  make: '',
  model: '',
  owner: '',
  cvrtDueDate: new Date(),
  tachoCalibrationDueDate: new Date(),
  thirteenWeekInspectionDueDate: new Date(),
  depot: {
    id: '',
    name: 'None',
  },
  fuelCard: {
    id: '',
    cardNumber: 'None',
  },
  tollTag: {
    id: '',
    tagNumber: 'None',
  },
};

const initialDepot: DepotUpdateModalItem = {
  id: '',
  name: '',
};

const initialUser: UserUpdateModalItem = {
  id: '',
  name: '',
  email: '',
  role: Role.User,
  depot: null,
};

export const currentFuelCardVar =
  makeVar<FuelCardUpdateModalItem>(initialFuelCard);

export const currentTollTagVar =
  makeVar<TollTagUpdateModalItem>(initialTollTag);

export const currentVehicleVar =
  makeVar<VehicleUpdateModalItem>(initialVehicle);

export const currentDepotVar = makeVar<DepotUpdateModalItem>(initialDepot);

export const currentUserVar = makeVar<UserUpdateModalItem>(initialUser);

export const hasAccessVar = makeVar(false);

// Vehicle Modals states
export const addVehicleModalStateVar = makeVar(false);
export const updateVehicleModalStateVar = makeVar(false);
export const deleteVehicleModalStateVar = makeVar(false);

// Fuel Card Modals states
export const addFuelCardModalStateVar = makeVar(false);
export const updateFuelCardModalStateVar = makeVar(false);
export const deleteFuelCardModalStateVar = makeVar(false);

// Toll Tag Modals states
export const addTollTagModalStateVar = makeVar(false);
export const updateTollTagModalStateVar = makeVar(false);
export const deleteTollTagModalStateVar = makeVar(false);

// Depot Modals states
export const addDepotModalStateVar = makeVar(false);
export const updateDepotModalStateVar = makeVar(false);
export const deleteDepotModalStateVar = makeVar(false);

// User Modals states
export const addUserModalStateVar = makeVar(false);
export const updateUserModalStateVar = makeVar(false);
export const deleteUserModalStateVar = makeVar(false);

// Vehicle Page Alerts
export const createVehicleAlertStateVar = makeVar(false);
export const updateVehicleAlertStateVar = makeVar(false);
export const deleteVehicleAlertStateVar = makeVar(false);

// Users Page Alerts
export const createUserAlertStateVar = makeVar(false);
export const updateUserAlertStateVar = makeVar(false);
export const deleteUserAlertStateVar = makeVar(false);

// Fuel Cards Page Alerts
export const createFuelCardAlertStateVar = makeVar(false);
export const updateFuelCardAlertStateVar = makeVar(false);
export const deleteFuelCardAlertStateVar = makeVar(false);

// Toll Tags Page Alerts
export const createTollTagAlertStateVar = makeVar(false);
export const updateTollTagAlertStateVar = makeVar(false);
export const deleteTollTagAlertStateVar = makeVar(false);

// Depots Page Alerts
export const createDepotAlertStateVar = makeVar(false);
export const updateDepotAlertStateVar = makeVar(false);
export const deleteDepotAlertStateVar = makeVar(false);

export const errorAlertStateVar = makeVar(false);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentFuelCard: {
            read() {
              return currentFuelCardVar();
            },
          },
          currentTollTag: {
            read() {
              return currentTollTagVar();
            },
          },
          currentVehicle: {
            read() {
              return currentVehicleVar();
            },
          },
          currentDepot: {
            read() {
              return currentDepotVar();
            },
          },
          currentUser: {
            read() {
              return currentUserVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
