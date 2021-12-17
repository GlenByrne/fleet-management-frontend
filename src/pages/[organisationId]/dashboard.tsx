import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DashboardsPage from '@/components/pages/dashboard';
import { useUpcomingMaintenaceQuery } from '@/generated/graphql';
import { useState } from 'react';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useUpcomingMaintenaceQuery({
    variables: {
      organisationId: organisationId,
    },
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <DashboardsPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
    />
  );
};

export default Dashboard;
