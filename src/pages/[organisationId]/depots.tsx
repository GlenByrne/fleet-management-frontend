import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Depot,
  UpdateDepotInput,
  useGetDepotsQuery,
} from '@/generated/graphql';
import MainLayout from '@/components/Atomic/templates/DepotTemplate';
import CreateDepotModal from '@/components/Atomic/organisms/Depots/Modal/Create/CreateDepotModal';
import UpdateDepotModal from '@/components/Atomic/organisms/Depots/Modal/Update/UpdateDepotModal';
import DeleteDepotModal from '@/components/Atomic/organisms/Depots/Modal/Delete/DeleteDepotModal';
import DepotList from '@/components/Atomic/organisms/Depots/List/DepotList';
import DepotsPage from '@/components/Atomic/pages/depots';

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

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <DepotsPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      searchCriteria={searchCriteria}
      changeSearchCriteria={changeSearchCriteria}
      searchSubmitHandler={searchSubmitHandler}
      quickAction={changeAddDepotModalState}
      quickActionLabel="New Depot"
      currentDepot={currentDepot}
      changeCurrentDepot={changeCurrentDepot}
      addDepotModalState={addDepotModalState}
      updateDepotModalState={updateDepotModalState}
      deleteDepotModalState={deleteDepotModalState}
      changeAddDepotModalState={changeAddDepotModalState}
      changeUpdateDepotModalState={changeUpdateDepotModalState}
      changeDeleteDepotModalState={changeDeleteDepotModalState}
    />
  );
};

export default Depots;
