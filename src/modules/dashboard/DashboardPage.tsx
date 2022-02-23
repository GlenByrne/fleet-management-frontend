import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import SideNav from '@/components/organisms/SideNav';
import {
  useGetUpcomingCvrtQuery,
  useGetUpcomingThirteenWeekQuery,
  useGetUpcomingTachoCalibrationQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DashboardTemplate from 'src/templates/DashboardTemplate';
import MainDashboard from './mainDashboard/MainDashboard';

const DashboardPage = () => {
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

export default DashboardPage;
