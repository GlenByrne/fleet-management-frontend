import { NextPage } from 'next';
import DefectList from '../../components/Defects/List/DefectList';
import Layout from 'core/Layout/Layout';
import { addDefectModalStateVar } from 'constants/apollo-client';
import CreateDefectModal from 'components/Defects/Modal/Create/CreateDefectModal';
import UpdateDefectModal from 'components/Defects/Modal/Update/UpdateDefectModal';
import DeleteDefectModal from 'components/Defects/Modal/Delete/DeleteDefectModal';

const Defects: NextPage = () => {
  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addDefectModalStateVar}
      quickActionLabel="New Defect"
      pageSearchable={false}
    >
      <DefectList />
      <CreateDefectModal />
      <UpdateDefectModal />
      <DeleteDefectModal />
    </Layout>
  );
};

export default Defects;
