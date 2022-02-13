import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  from,
  fromPromise,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
  Observable,
  Operation,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Router from 'next/router';
import {
  RefreshAccessTokenDocument,
  StrictTypedTypePolicies,
  User,
} from '@/generated/graphql';
import { print } from 'graphql';
import { Client, ClientOptions, createClient } from 'graphql-ws';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';
import { useMemo } from 'react';

export const successAlertStateVar = makeVar(false);
export const successTextVar = makeVar('');

export const errorAlertStateVar = makeVar(false);
export const errorTextVar = makeVar('');

export const loggedInUserVar = makeVar<User | null>(null);
export const accessTokenVar = makeVar<string | null>(null);

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const createGraphqlClient = () => {
  class WebSocketLink extends ApolloLink {
    private client: Client;

    constructor(options: ClientOptions) {
      super();
      this.client = createClient(options);
    }

    public request(operation: Operation): Observable<FetchResult> {
      return new Observable((sink) => {
        return this.client.subscribe<FetchResult>(
          { ...operation, query: print(operation.query) },
          {
            next: sink.next.bind(sink),
            complete: sink.complete.bind(sink),
            error: sink.error.bind(sink),
          }
        );
      });
    }
  }

  const wsLink = process.browser
    ? new WebSocketLink({
        url: 'ws://localhost:4000/graphql',
        // connectionParams: () => {
        //   // get the authentication token from local storage if it exists
        //   const token = accessTokenVar();
        //   // return the headers to the context so httpLink can read them
        //   return {
        //     headers: {
        //       Authorization: token ? `Bearer ${token}` : '',
        //     },
        //   };
        // },
      })
    : null;

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

  const splitLink =
    process.browser && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);

            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

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

  const typePolicies: StrictTypedTypePolicies = {
    Query: {
      fields: {
        fuelCards: relayStylePagination(),
        depots: relayStylePagination(),
        vehicles: relayStylePagination(),
      },
    },
    FuelCard: {
      merge: true,
    },
    Depot: {
      merge: true,
    },
    Vehicle: {
      merge: true,
    },
  };

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink, splitLink]),
    cache: new InMemoryCache({ typePolicies }),
  });

  return client;
};

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createGraphqlClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
