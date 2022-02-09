import SideNav from '@/components/organisms/SideNav';
import { useUpcomingMaintenanceQuery } from '@/generated/graphql';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import Dashboard from '@/components/organisms/Dashboard/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';

const DashboardsPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useUpcomingMaintenanceQuery({
    variables: {
      data: {
        organisationId: organisationId,
      },
      upcomingThirteenWeekData2: {
        organisationId: organisationId,
      },
      upcomingTachoCalibrationData2: {
        organisationId: organisationId,
      },
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
    <DashboardTemplate
      header={
        <HeaderNoSearchBarOrQuickAction
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      content={<Dashboard data={data} loading={loading} error={error} />}
    />
  );
};

export default DashboardsPage;
