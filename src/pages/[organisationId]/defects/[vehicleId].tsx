import { NextPage } from 'next';
import DefectList from '../../../components/Defects/List/DefectList';
import { addDefectModalStateVar } from 'constants/apollo-client';
import CreateDefectModal from 'components/Defects/Modal/Create/CreateDefectModal';
import UpdateDefectModal from 'components/Defects/Modal/Update/UpdateDefectModal';
import DeleteDefectModal from 'components/Defects/Modal/Delete/DeleteDefectModal';
import MainLayout from 'core/Layout/MainLayout/MainLayout';

const Defects: NextPage = () => {
  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={addDefectModalStateVar}
      quickActionLabel="New Defect"
      pageSearchable={false}
    >
      <DefectList />
      <CreateDefectModal />
      <UpdateDefectModal />
      <DeleteDefectModal />
    </MainLayout>
  );
};

export default Defects;
