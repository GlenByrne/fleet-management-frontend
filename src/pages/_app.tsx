import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import ErrorNotification from '@/core/Alerts/ErrorNotification';
import SuccessNotification from '@/core/Alerts/SuccessNotification';
import client from '@/constants/apollo-client';

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
