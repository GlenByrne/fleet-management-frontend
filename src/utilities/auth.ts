import Router, { useRouter } from 'next/router';
import client, {
  accessTokenVar,
  loggedInUserVar,
} from 'src/apollo/apollo-client';
import { useLogoutMutation } from '@/generated/graphql';

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

function useAuthenticated() {
  const router = useRouter();

  // useEffect(() => {
  //   const userOrganisations = loggedInUserVar()?.organisations;
  //   if (userOrganisations?.length == 0 && checkAuth()) {
  //     router.push('/organisations');
  //   } else if (!checkAuth()) {
  //     router.push('/login');
  //   }
  // }, [accessTokenVar, loggedInUserVar()?.organisations]);
}
