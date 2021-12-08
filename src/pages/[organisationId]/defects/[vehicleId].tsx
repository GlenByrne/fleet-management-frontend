import CreateDefectModal from '@/components/Defects/Modal/Create/CreateDefectModal';
import DeleteDefectModal from '@/components/Defects/Modal/Delete/DeleteDefectModal';
import UpdateDefectModal from '@/components/Defects/Modal/Update/UpdateDefectModal';
import { addDefectModalStateVar } from '@/constants/apollo-client';
import MainLayout from '@/core/Layout/MainLayout/MainLayout';
import { NextPage } from 'next';
import DefectList from '../../../components/Defects/List/DefectList';

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
