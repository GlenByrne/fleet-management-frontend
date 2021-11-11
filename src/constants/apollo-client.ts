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

// Vehicle Page Alerts
export const createVehicleAlertStateVar = makeVar(false);
export const updateVehicleAlertStateVar = makeVar(false);
export const updateVehicleCVRTAlertStateVar = makeVar(false);
export const updateVehicleThirteenWeekAlertStateVar = makeVar(false);
export const updateVehicleTachoCalibrationAlertStateVar = makeVar(false);
export const deleteVehicleAlertStateVar = makeVar(false);

// Defect Page Alerts
export const createDefectAlertStateVar = makeVar(false);
export const updateDefectAlertStateVar = makeVar(false);
export const deleteDefectAlertStateVar = makeVar(false);

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

// Logout Alerts
export const logoutAlertVar = makeVar(false);
export const authTimeoutAlertVar = makeVar(false);

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
        authTimeoutAlertVar(true);
      } else {
        errorTextVar(message);
        errorAlertStateVar(true);
        console.log(message);
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
        },
      },
    },
  }),
});

export default client;
