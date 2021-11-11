import Dashboard from 'components/Dashboard/Dashboard';
import Layout from 'core/Layout/Layout';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout hasQuickActionButton={false} pageSearchable={false}>
      <Dashboard />
    </Layout>
  );
};

export default Home;
