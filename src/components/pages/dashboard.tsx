import SideNav from '@/components/organisms/SideNav';
import { ApolloError } from '@apollo/client';
import { UpcomingMaintenaceQuery } from '@/generated/graphql';
import DashboardTemplate from '@/components/templates/DashboardTemplate';
import HeaderNoSearchBarOrQuickAction from '@/components/organisms/HeaderNoSearchBarOrQuickAction';
import Dashboard from '@/components/organisms/Dashboard/Dashboard';

type DashboardsProps = {
  data: UpcomingMaintenaceQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
};

const DashboardsPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
}: DashboardsProps) => {
  return (
    <DashboardTemplate
      header={
        <HeaderNoSearchBarOrQuickAction setMobileMenuOpen={setMobileMenuOpen} />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      }
      content={<Dashboard data={data} loading={loading} error={error} />}
    />
  );
};

export default DashboardsPage;
