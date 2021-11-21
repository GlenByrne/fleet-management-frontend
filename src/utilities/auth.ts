import client, {
  accessTokenVar,
  loggedInUserVar,
} from 'constants/apollo-client';
import { useLogoutMutation } from 'generated/graphql';
import Router from 'next/router';

export const checkAuth = () => {
  const accessToken = accessTokenVar();
  return Boolean(accessToken);
};

export const LogOut = () => {
  const [logOut] = useLogoutMutation();

  logOut({
    onCompleted: () => {
      accessTokenVar(null);
      loggedInUserVar(null);
      Router.push('/login');
      client.clearStore();
    },
  });
};
