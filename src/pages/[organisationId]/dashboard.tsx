import { NextPage } from 'next';
import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import SideNav from '@/components/organisms/SideNav';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import { useUpcomingMaintenanceQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainDashboard from '@/components/organisms/Dashboard/MainDashboard';

const Dashboard: NextPage = () => {
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
      content={<MainDashboard data={data} loading={loading} error={error} />}
    />
  );
};

export default Dashboard;
