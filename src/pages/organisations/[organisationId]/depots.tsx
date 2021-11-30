import { NextPage } from 'next';
import { addDepotModalStateVar } from 'constants/apollo-client';
import CreateDepotModal from 'components/Depots/Modal/Create/CreateDepotModal';
import UpdateDepotModal from 'components/Depots/Modal/Update/UpdateDepotModal';
import DeleteDepotModal from 'components/Depots/Modal/Delete/DeleteDepotModal';
import DepotList from 'components/Depots/List/DepotList';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetDepotsQuery } from 'generated/graphql';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import useAuthentication from 'hooks/useAuthentication';
import Loading from 'core/Loading';
import { useRouter } from 'next/router';

const Depots: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetDepotsQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout
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
      <DepotList data={data} loading={loading} error={error} />
    </MainLayout>
  );
};

export default Depots;
