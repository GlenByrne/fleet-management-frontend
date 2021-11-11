import { NextPage } from 'next';
import DefectList from '../../components/Defects/List/DefectList';
import Layout from 'core/Layout/Layout';
import { addDefectModalStateVar } from 'constants/apollo-client';
import CreateDefectModal from 'components/Defects/Modal/Create/CreateDefectModal';
import CreateDefectAlert from 'components/Defects/Alerts/CreateDefectAlert';
import UpdateDefectModal from 'components/Defects/Modal/Update/UpdateDefectModal';
import UpdateDefectAlert from 'components/Defects/Alerts/UpdateDefectAlert';
import DeleteDefectModal from 'components/Defects/Modal/Delete/DeleteDefectModal';
import DeleteDefectAlert from 'components/Defects/Alerts/DeleteDefectAlert';

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
      <CreateDefectAlert />
      <UpdateDefectModal />
      <UpdateDefectAlert />
      <DeleteDefectModal />
      <DeleteDefectAlert />
    </Layout>
  );
};

export default Defects;
