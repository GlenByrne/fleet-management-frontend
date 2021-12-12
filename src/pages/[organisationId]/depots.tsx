import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Depot,
  UpdateDepotInput,
  useGetDepotsQuery,
} from '@/generated/graphql';
import MainLayout from '@/core/Layout/MainLayout/MainLayout';
import CreateDepotModal from '@/components/Depots/Modal/Create/CreateDepotModal';
import UpdateDepotModal from '@/components/Depots/Modal/Update/UpdateDepotModal';
import DeleteDepotModal from '@/components/Depots/Modal/Delete/DeleteDepotModal';
import DepotList from '@/components/Depots/List/DepotList';

const Depots: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [addDepotModalState, setAddDepotModalState] = useState(false);
  const [updateDepotModalState, setUpdateDepotModalState] = useState(false);
  const [deleteDepotModalState, setDeleteDepotModalState] = useState(false);

  const [currentDepot, setCurrentDepot] = useState<UpdateDepotInput>({
    id: '',
    name: '',
  });

  const changeAddDepotModalState = (newState: boolean) => {
    setAddDepotModalState(newState);
  };

  const changeUpdateDepotModalState = (newState: boolean) => {
    setUpdateDepotModalState(newState);
  };

  const changeDeleteDepotModalState = (newState: boolean) => {
    setDeleteDepotModalState(newState);
  };

  const changeCurrentDepot = (depot: Depot) => {
    const chosenDepot: UpdateDepotInput = {
      id: depot.id,
      name: depot.name,
    };
    setCurrentDepot(chosenDepot);
  };

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
      quickAction={changeAddDepotModalState}
      quickActionLabel="New Depot"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateDepotModal
        modalState={addDepotModalState}
        changeModalState={changeAddDepotModalState}
      />
      <UpdateDepotModal
        currentDepot={currentDepot}
        modalState={updateDepotModalState}
        changeModalState={changeUpdateDepotModalState}
      />
      <DeleteDepotModal
        searchCriteria={searchCriteria}
        currentDepot={currentDepot}
        modalState={deleteDepotModalState}
        changeModalState={changeDeleteDepotModalState}
      />
      <DepotList
        data={data}
        loading={loading}
        error={error}
        changeAddDepotModalState={changeAddDepotModalState}
        changeDeleteDepotModalState={changeDeleteDepotModalState}
        changeUpdateDepotModalState={changeUpdateDepotModalState}
        changeCurrentDepot={changeCurrentDepot}
      />
    </MainLayout>
  );
};

export default Depots;
