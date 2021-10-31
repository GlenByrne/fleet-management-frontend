import Layout from 'core/Layout/Layout';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  return (
    <Layout hasQuickActionButton={false}>
      <div></div>
    </Layout>
  );
};

export default Home;
