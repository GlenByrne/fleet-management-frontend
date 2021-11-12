import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addInfringementModalStateVar } from 'constants/apollo-client';
import { useGetDriversQuery } from 'generated/graphql';
import InfringementList from 'components/Infringements/List/InfringementList';
import CreateInfringementModal from 'components/Infringements/Modal/Create/CreateInfringementModal';

const Infringements: NextPage = () => {
  const { data, loading, error } = useGetDriversQuery();

  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addInfringementModalStateVar}
      quickActionLabel="New Infringement"
      pageSearchable={false}
    >
      <CreateInfringementModal data={data} />
      <InfringementList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default Infringements;
