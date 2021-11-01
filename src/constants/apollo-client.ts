import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Role, User, VehicleType } from 'generated/graphql';
import {
  DepotUpdateModalItem,
  FuelCardUpdateModalItem,
  TollTagUpdateModalItem,
  UserDisplayDetails,
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

export const currentFuelCardVar =
  makeVar<FuelCardUpdateModalItem>(initialFuelCard);

export const currentTollTagVar =
  makeVar<TollTagUpdateModalItem>(initialTollTag);

export const currentVehicleVar =
  makeVar<VehicleUpdateModalItem>(initialVehicle);

export const currentDepotVar = makeVar<DepotUpdateModalItem>(initialDepot);

export const currentUserVar = makeVar<UserDisplayDetails | null>(null);

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
        },
      },
    },
  }),
});

export default client;
