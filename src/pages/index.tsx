import Dashboard from 'components/Dashboard/Dashboard';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <MainLayout hasQuickActionButton={false} pageSearchable={false}>
      <Dashboard />
    </MainLayout>
  );
};

export default Home;
