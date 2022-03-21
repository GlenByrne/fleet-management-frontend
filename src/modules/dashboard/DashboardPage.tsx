import React, { useState } from 'react';
import DashboardTemplate from 'src/templates/DashboardTemplate';
import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import SideNav from '@/components/organisms/SideNav';
import MainDashboard from './mainDashboard/MainDashboard';

function DashboardPage() {
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
}

export default DashboardPage;
