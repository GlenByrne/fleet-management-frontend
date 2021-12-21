import {
  ApolloClient,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Router from 'next/router';
import { RefreshAccessTokenDocument, User } from '@/generated/graphql';

export const successAlertStateVar = makeVar(false);
export const successTextVar = makeVar('');

export const errorAlertStateVar = makeVar(false);
export const errorTextVar = makeVar('');

export const loggedInUserVar = makeVar<User | null>(null);
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
    .mutate({ mutation: RefreshAccessTokenDocument })
    .then((response) => {
      const { accessToken } = response.data.refreshAccessToken;
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
  cache: new InMemoryCache(),
});

export default client;
