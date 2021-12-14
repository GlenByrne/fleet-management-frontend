import Dashboard from '@/components/Dashboard/Dashboard';
import MainLayout from '@/components/Atomic/templates/FuelCardTemplate';
import { NextPage } from 'next';

const Home: NextPage = () => {
  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout hasQuickActionButton={false} pageSearchable={false}>
      <Dashboard />
    </MainLayout>
  );
};

export default Home;
