import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addDepotModalStateVar, currentUserVar } from 'constants/apollo-client';
import CreateDepotModal from 'components/Depots/Modal/Create/CreateDepotModal';
import UpdateDepotModal from 'components/Depots/Modal/Update/UpdateDepotModal';
import DeleteDepotModal from 'components/Depots/Modal/Delete/DeleteDepotModal';
import DepotList from 'components/Depots/List/DepotList';
import { useGetCurrentUserQuery } from 'generated/graphql';

const Depots: NextPage = () => {
  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addDepotModalStateVar}
      quickActionLabel="New Depot"
    >
      <CreateDepotModal />
      <UpdateDepotModal />
      <DeleteDepotModal />
      <DepotList />
    </Layout>
  );
};

export default Depots;
