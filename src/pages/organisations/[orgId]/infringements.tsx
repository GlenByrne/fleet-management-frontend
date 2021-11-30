import { NextPage } from 'next';
import { addInfringementModalStateVar } from 'constants/apollo-client';
import InfringementList from 'components/Infringements/List/InfringementList';
import CreateInfringementModal from 'components/Infringements/Modal/Create/CreateInfringementModal';
import UpdateInfringementModal from 'components/Infringements/Modal/Update/UpdateInfringementModal';
import DeleteInfringementModal from 'components/Infringements/Modal/Delete/DeleteInfringementModal';
import UpdateInfringementStatusModal from 'components/Infringements/Modal/Update/UpdateInfringementStatusModal';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import Loading from 'core/Loading';
import useAuthentication from 'hooks/useAuthentication';

const Infringements: NextPage = () => {
  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={addInfringementModalStateVar}
      quickActionLabel="New Infringement"
      pageSearchable={false}
    >
      <CreateInfringementModal />
      <UpdateInfringementModal />
      <UpdateInfringementStatusModal />
      <DeleteInfringementModal />
      <InfringementList />
    </MainLayout>
  );
};

export default Infringements;
