import Layout from 'core/Layout/Layout';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetCurrentUserQuery } from 'generated/graphql';
import { currentUserVar } from 'constants/apollo-client';

const Home: NextPage = () => {
  return (
    <Layout hasQuickActionButton={false}>
      <div></div>
    </Layout>
  );
};

export default Home;
