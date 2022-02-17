import { NextPage } from 'next';
import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import SideNav from '@/components/organisms/SideNav';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainDashboard from '@/components/organisms/Dashboard/MainDashboard';
import {
  useGetUpcomingCvrtQuery,
  useGetUpcomingTachoCalibrationQuery,
  useGetUpcomingThirteenWeekQuery,
} from '@/generated/graphql';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [upcomingCVRT] = useGetUpcomingCvrtQuery({
    variables: {
      data: {
        organisationId: organisationId,
      },
    },
  });

  const [upcomingThirteenWeek] = useGetUpcomingThirteenWeekQuery({
    variables: {
      data: {
        organisationId: organisationId,
      },
    },
  });

  const [upcomingTachoCalibration] = useGetUpcomingTachoCalibrationQuery({
    variables: {
      data: {
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
      content={
        <MainDashboard
          upcomingCVRT={upcomingCVRT}
          upcomingThirteenWeek={upcomingThirteenWeek}
          upcomingTachoCalibration={upcomingTachoCalibration}
        />
      }
    />
  );
};

export default Dashboard;
