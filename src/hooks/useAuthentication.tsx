import { accessTokenVar, loggedInUserVar } from 'constants/apollo-client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function useAuthentication() {
  const router = useRouter();
  const userOrganisations = loggedInUserVar()?.organisations;

  useEffect(() => {
    if (userOrganisations == undefined && accessTokenVar()) {
      router.push('/organisations');
    } else if (!accessTokenVar()) {
      router.push('/login');
    }
  }, [userOrganisations, router, accessTokenVar]);

  return accessTokenVar();
}

export default useAuthentication;
