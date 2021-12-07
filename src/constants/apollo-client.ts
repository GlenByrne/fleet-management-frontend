import {
  ApolloClient,
  concat,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  DefectStatus,
  InfringementStatus,
  RefreshTokenDocument,
  Role,
  UpdateDepotInput,
  UsersPayload,
  VehicleType,
} from 'generated/graphql';
import {
  DefectUpdateModalItem,
  FuelCardUpdateModalItem,
  InfringementUpdateModalItem,
  TollTagUpdateModalItem,
  UserUpdateModalItem,
  VehicleUpdateModalItem,
} from './types';
import { LogOut } from 'utilities/auth';
import Router from 'next/router';

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

const initialInfringement: InfringementUpdateModalItem = {
  id: '',
  description: '',
  dateOccured: new Date(),
  status: InfringementStatus.Unsigned,
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

export const currentInfringementVar =
  makeVar<InfringementUpdateModalItem>(initialInfringement);

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
export const inviteUserModalStateVar = makeVar(false);
export const updateUserModalStateVar = makeVar(false);
export const removeUserModalStateVar = makeVar(false);

// Infringement Modals states
export const addInfringementModalStateVar = makeVar(false);
export const updateInfringementModalStateVar = makeVar(false);
export const updateInfringementStatusModalStateVar = makeVar(false);
export const deleteInfringementModalStateVar = makeVar(false);

// Organisation Modals states
export const addOrganisationModalStateVar = makeVar(false);

export const successAlertStateVar = makeVar(false);
export const successTextVar = makeVar('');

export const errorAlertStateVar = makeVar(false);
export const errorTextVar = makeVar('');

export const loggedInUserVar = makeVar<UsersPayload | null>(null);
export const accessTokenVar = makeVar<string | null>(null);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = accessTokenVar();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

let isRefreshing = false;
let pendingRequests: Function[] = [];

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const getNewToken = async () => {
  return await client
    .mutate({ mutation: RefreshTokenDocument })
    .then((response) => {
      const { accessToken } = response.data.refreshToken;
      accessTokenVar(accessToken);
    });
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err?.message) {
        case 'Not Authorised!':
          if (!isRefreshing) {
            setIsRefreshing(true);

            return fromPromise(
              getNewToken().catch(() => {
                resolvePendingRequests();
                setIsRefreshing(false);

                accessTokenVar(null);
                loggedInUserVar(null);
                Router.push('/login');
                client.clearStore();
                successTextVar('Please log back in');
                successAlertStateVar(true);

                return forward(operation);
              })
            ).flatMap(() => {
              resolvePendingRequests();
              setIsRefreshing(false);

              return forward(operation);
            });
          } else {
            return fromPromise(
              new Promise<void>((resolve) => {
                addPendingRequest(() => resolve());
              })
            ).flatMap(() => {
              return forward(operation);
            });
          }
        default:
          errorTextVar(err.message);
          errorAlertStateVar(true);
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
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
          currentInfringement: {
            read() {
              return currentInfringementVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
