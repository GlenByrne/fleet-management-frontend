import { NextPage } from 'next';
import DepotList from '@/components/organisms/Depots/List/DepotList';
import CreateDepotModal from '@/components/organisms/Depots/Modal/Create/CreateDepotModal';
import DeleteDepotModal from '@/components/organisms/Depots/Modal/Delete/DeleteDepotModal';
import UpdateDepotModal from '@/components/organisms/Depots/Modal/Update/UpdateDepotModal';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import DepotTemplate from 'src/templates/DepotTemplate';
import {
  UpdateDepotInput,
  Depot,
  useGetDepotsQuery,
  useGetDepotsWithVehiclesQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState, FormEvent, FormEventHandler } from 'react';

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
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const first = 10;

  const [depotsWithVehicles, refetchDepotsWithVehicles] =
    useGetDepotsWithVehiclesQuery({
      variables: {
        first,
        data: {
          organisationId,
        },
      },
    });

  const endCursor = depotsWithVehicles.data?.depots?.pageInfo?.endCursor;

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetchDepotsWithVehicles({
      first,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  const fetchMoreDepots = () => {
    // fetchMore({
    //   variables: {
    //     after: endCursor,
    //   },
    // });
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <DepotTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={changeAddDepotModalState}
          quickActionLabel="New Depot"
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      content={
        <>
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
            data={depotsWithVehicles.data}
            loading={depotsWithVehicles.fetching}
            error={depotsWithVehicles.error}
            fetchMore={fetchMoreDepots}
            changeAddDepotModalState={changeAddDepotModalState}
            changeDeleteDepotModalState={changeDeleteDepotModalState}
            changeUpdateDepotModalState={changeUpdateDepotModalState}
            changeCurrentDepot={changeCurrentDepot}
          />
        </>
      }
    />
  );
};

export default Depots;
