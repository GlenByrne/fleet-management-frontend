import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import ErrorNotification from '@/components/molecules/ErrorNotification';
import SuccessNotification from '@/components/molecules/SuccessNotification';
import { createGraphqlClient } from 'src/apollo/apollo-client';

export const client = createGraphqlClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ErrorNotification />
      <SuccessNotification />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
