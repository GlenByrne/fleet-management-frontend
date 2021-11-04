import Layout from 'core/Layout/Layout';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout hasQuickActionButton={false} pageSearchable={false}>
      <div></div>
    </Layout>
  );
};

export default Home;
