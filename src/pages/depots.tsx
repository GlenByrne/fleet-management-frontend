import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addDepotModalStateVar } from 'constants/apollo-client';
import CreateDepotModal from 'components/Depots/Modal/Create/CreateDepotModal';
import UpdateDepotModal from 'components/Depots/Modal/Update/UpdateDepotModal';
import DeleteDepotModal from 'components/Depots/Modal/Delete/DeleteDepotModal';
import DepotList from 'components/Depots/List/DepotList';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetDepotsQuery } from 'generated/graphql';
import CreateDepotAlert from 'components/Depots/Alerts/CreateDepotAlert';
import UpdateDepotAlert from 'components/Depots/Alerts/UpdateDepotAlert';
import DeleteDepotAlert from 'components/Depots/Alerts/DeleteDepotAlert';

const Depots: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetDepotsQuery();

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
      },
    });
  };

  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addDepotModalStateVar}
      quickActionLabel="New Depot"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateDepotModal />
      <UpdateDepotModal />
      <DeleteDepotModal />
      <CreateDepotAlert />
      <UpdateDepotAlert />
      <DeleteDepotAlert />
      <DepotList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default Depots;
