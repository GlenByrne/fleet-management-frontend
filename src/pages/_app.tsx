import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import ErrorNotification from '@/components/molecules/Notifications/ErrorNotification';
import SuccessNotification from '@/components/molecules/Notifications/SuccessNotification';
import {
  createClient,
  dedupExchange,
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
import { RefreshAccessTokenDocument } from '@/generated/graphql';
import { refocusExchange } from '@urql/exchange-refocus';
import { useState } from 'react';
import { cacheExchange } from '@urql/exchange-graphcache';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [accessToken, setAccessToken] = useState(null);

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
      if (accessToken) {
        return { accessToken };
      }
      return null;
    }

    const { data } = await mutate(RefreshAccessTokenDocument);

    if (data.refreshAccessToken) {
      const { newAccessToken } = data.refreshAccessToken;
      setAccessToken(newAccessToken);
      return { accessToken: newAccessToken };
    }

    //logout

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
              return node.kind === 'Field' && node.name.value === 'login';
            })
          );
        })
      );
    } else if (false /* JWT is expired */) {
      return true;
    }

    return false;
  };

  const wsClient = createWSClient({
    url: 'ws://localhost:4000/graphql',
  });

  const ssr = ssrExchange({
    isClient: !isServerSide,
  });

  const client = createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      refocusExchange(),
      cacheExchange({}),
      authExchange({
        getAuth,
        addAuthToOperation,
        willAuthError,
      }),
      retryExchange(retryOptions),
      ssr,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
      fetchExchange,
    ],
  });

  if (pageProps.urqlState) {
    ssr.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <ErrorNotification />
      <SuccessNotification />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
