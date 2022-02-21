import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import {
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  makeOperation,
  Provider,
  ssrExchange,
  subscriptionExchange,
} from 'urql';
import { createClient as createWSClient } from 'graphql-ws';
import { devtoolsExchange } from '@urql/devtools';
import { retryExchange } from '@urql/exchange-retry';
import { RetryExchangeOptions } from '@urql/exchange-retry/dist/types/retryExchange';
import { authExchange } from '@urql/exchange-auth';
import {
  RefreshAccessTokenDocument,
  useLogoutMutation,
} from '@/generated/graphql';
import { refocusExchange } from '@urql/exchange-refocus';
import { cacheExchange } from '@urql/exchange-graphcache';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

let accessToken: string | null | undefined = null;
let isLoggedIn: boolean | null;

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = (token: string | null | undefined) => {
  accessToken = token;
};

export const getIsLoggedIn = () => {
  return isLoggedIn;
};

export const setIsLoggedIn = (state: boolean) => {
  isLoggedIn = state;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [logOutResult, logOut] = useLogoutMutation();

  const isServerSide = typeof window === 'undefined';

  const retryOptions: RetryExchangeOptions = {
    initialDelayMs: 1000,
    maxDelayMs: 15000,
    randomDelay: true,
    maxNumberAttempts: 2,
    retryIf: (error) => {
      return !!(error.graphQLErrors.length > 0 || error.networkError);
    },
  };

  const getAuth = async ({ authState, mutate }: any) => {
    if (!authState) {
      const token = getAccessToken();

      if (token) {
        return { token };
      }

      const result = await mutate(RefreshAccessTokenDocument);

      if (result.data) {
        const { accessToken } = result.data.refreshAccessToken;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        return { token: accessToken };
      }

      return null;
    }

    // const result = await mutate(RefreshAccessTokenDocument);

    // if (result.data) {
    //   const { accessToken } = result.data.refreshAccessToken;
    //   setAccessToken(accessToken);
    //   setIsLoggedIn(true);
    //   return { token: accessToken };
    // }

    logOut();
    setAccessToken(null);
    setIsLoggedIn(false);
    router.push('/login');

    return null;
  };

  const addAuthToOperation = ({ authState, operation }: any) => {
    if (!authState || !authState.token) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.token}`,
        },
      },
    });
  };

  const willAuthError = ({ operation, authState }: any) => {
    if (!authState) {
      // Detect our login mutation and let this operation through:
      return !(
        operation.kind === 'mutation' &&
        // Here we find any mutation definition with the "login" field
        operation.query.definitions.some((definition: any) => {
          return (
            definition.kind === 'OperationDefinition' &&
            definition.selectionSet.selections.some((node: any) => {
              // The field name is just an example, since signup may also be an exception
              return (
                node.kind === 'Field' &&
                (node.name.value === 'login' || node.name.value === 'register')
              );
            })
          );
        })
      );
    } else if (false /* JWT is expired */) {
      return true;
    }

    return false;
  };

  // const wsClient = createWSClient({
  //   url: 'ws://localhost:4000/graphql',
  // });

  const ssr = ssrExchange({
    isClient: !isServerSide,
  });

  const client = useMemo(() => {
    if (isLoggedIn === null) {
      return null;
    }

    return createClient({
      url: 'http://localhost:4000/graphql',
      fetchOptions: {
        credentials: 'include',
      },
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        refocusExchange(),
        cacheExchange({
          keys: {
            UsersOnOrganisations: (data) =>
              `${data.organisationId};${data.userId}`,
          },
        }),
        errorExchange({
          onError: (error) => {
            const isAuthError = error.graphQLErrors.some(
              (e) => e.message === 'Not Authorised!'
            );
            if (isAuthError) {
              logOut();
              setAccessToken(null);
              router.push('/login');
            }
          },
        }),
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
        }),
        retryExchange(retryOptions),
        ssr,
        // subscriptionExchange({
        //   forwardSubscription: (operation) => ({
        //     subscribe: (sink) => ({
        //       unsubscribe: wsClient.subscribe(operation, sink),
        //     }),
        //   }),
        // }),
        fetchExchange,
      ],
    });
  }, [getAuth, logOut, router, ssr]);

  if (pageProps.urqlState) {
    ssr.restoreData(pageProps.urqlState);
  }

  if (!client) {
    return null;
  }

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
