import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import SideNav from '@/components/organisms/SideNav';
import {
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
      content={<MainDashboard />}
    />
  );
};

export default DashboardPage;
