import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import ErrorNotification from '@/components/molecules/ErrorNotification';
import SuccessNotification from '@/components/molecules/SuccessNotification';
import { createGraphqlClient, useApollo } from 'src/apollo/apollo-client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ErrorNotification />
      <SuccessNotification />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
