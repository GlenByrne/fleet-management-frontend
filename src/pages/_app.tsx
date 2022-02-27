import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useApollo } from 'src/apollo/apollo-client';
import 'tailwindcss/tailwind.css';

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
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      {/* <ErrorNotification />
      <SuccessNotification /> */}
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
