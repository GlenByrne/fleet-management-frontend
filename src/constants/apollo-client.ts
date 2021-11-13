import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  DefectStatus,
  Role,
  UpdateDepotInput,
  UsersPayload,
  VehicleType,
} from 'generated/graphql';
import {
  DefectUpdateModalItem,
  FuelCardUpdateModalItem,
  TollTagUpdateModalItem,
  UserUpdateModalItem,
  VehicleUpdateModalItem,
} from './types';
import { logOut } from 'utilities/auth';

const initialFuelCard: FuelCardUpdateModalItem = {
  id: '',
  cardNumber: '',
  cardProvider: '',
};

const initialTollTag: TollTagUpdateModalItem = {
  id: '',
  tagNumber: '',
  tagProvider: '',
};

const initialVehicle: VehicleUpdateModalItem = {
  id: '',
  type: VehicleType.Van,
  registration: '',
  make: '',
  model: '',
  owner: '',
  cvrt: new Date(),
  tachoCalibration: new Date(),
  thirteenWeekInspection: new Date(),
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

const initialDepot: UpdateDepotInput = {
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

const initialDefect: DefectUpdateModalItem = {
  id: '',
  description: '',
  dateReported: new Date(),
  reporter: '',
  dateCompleted: null,
  status: DefectStatus.Incomplete,
};

export const currentFuelCardVar =
  makeVar<FuelCardUpdateModalItem>(initialFuelCard);

export const currentTollTagVar =
  makeVar<TollTagUpdateModalItem>(initialTollTag);

export const currentVehicleVar =
  makeVar<VehicleUpdateModalItem>(initialVehicle);

export const currentDepotVar = makeVar<UpdateDepotInput>(initialDepot);

export const currentUserVar = makeVar<UserUpdateModalItem>(initialUser);

export const currentDefectVar = makeVar<DefectUpdateModalItem>(initialDefect);

export const hasAccessVar = makeVar(false);

// Vehicle Modals states
export const addVehicleModalStateVar = makeVar(false);
export const updateVehicleModalStateVar = makeVar(false);
export const updateVehicleCVRTModalStateVar = makeVar(false);
export const updateVehicleThirteenWeekModalStateVar = makeVar(false);
export const updateVehicleTachoCalibrationModalStateVar = makeVar(false);
export const deleteVehicleModalStateVar = makeVar(false);

// Defect Modal State
export const addDefectModalStateVar = makeVar(false);
export const updateDefectModalStateVar = makeVar(false);
export const deleteDefectModalStateVar = makeVar(false);

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

// Infringement Modals states
export const addInfringementModalStateVar = makeVar(false);

export const successAlertStateVar = makeVar(false);
export const successTextVar = makeVar('');

export const errorAlertStateVar = makeVar(false);
export const errorTextVar = makeVar('');

export const loggedInUserVar = makeVar<UsersPayload | null>(null);

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === 'Not Authorised!' || message === 'jwt expired') {
        logOut();
        successTextVar(
          'You have been logged out due to your login credentials expiring. Please log back in'
        );
        successAlertStateVar(true);
      } else {
        errorTextVar(message);
        errorAlertStateVar(true);
      }
    });
  } else if (networkError) {
    errorTextVar('A network error has occured');
    errorAlertStateVar(true);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
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
          currentDefect: {
            read() {
              return currentDefectVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
