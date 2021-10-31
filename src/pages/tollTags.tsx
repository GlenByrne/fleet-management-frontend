import { NextPage } from 'next';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from 'components/TollTags/Modal/Delete/DeleteTollTagModal';
import { addTollTagModalStateVar } from 'constants/apollo-client';

const TollTags: NextPage = () => {
  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addTollTagModalStateVar}
      quickActionLabel="New Tag"
    >
      <CreateTollTagModal />
      <UpdateTollTagModal />
      <DeleteTollTagModal />
      <TollTagList />
    </Layout>
  );
};

export default TollTags;
