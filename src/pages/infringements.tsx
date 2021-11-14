import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addInfringementModalStateVar } from 'constants/apollo-client';
import InfringementList from 'components/Infringements/List/InfringementList';
import CreateInfringementModal from 'components/Infringements/Modal/Create/CreateInfringementModal';
import UpdateInfringementModal from 'components/Infringements/Modal/Update/UpdateInfringementModal';
import DeleteInfringementModal from 'components/Infringements/Modal/Delete/DeleteInfringementModal';
import UpdateInfringementStatusModal from 'components/Infringements/Modal/Update/UpdateInfringementStatusModal';

const Infringements: NextPage = () => {
  return (
    <Layout
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
    </Layout>
  );
};

export default Infringements;
