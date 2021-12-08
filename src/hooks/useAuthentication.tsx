import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { accessTokenVar, loggedInUserVar } from '@/constants/apollo-client';

function useAuthentication() {
  const router = useRouter();
  const userOrganisations = loggedInUserVar()?.organisations;

  useEffect(() => {
    if (userOrganisations == undefined && accessTokenVar()) {
      router.push('/organisations');
    } else if (!accessTokenVar()) {
      router.push('/login');
    }
  }, [userOrganisations, router]);

  return accessTokenVar();
}

export default useAuthentication;
