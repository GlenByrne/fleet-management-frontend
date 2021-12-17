import DepotList from '@/components/organisms/Depots/List/DepotList';
import CreateDepotModal from '@/components/organisms/Depots/Modal/Create/CreateDepotModal';
import DeleteDepotModal from '@/components/organisms/Depots/Modal/Delete/DeleteDepotModal';
import UpdateDepotModal from '@/components/organisms/Depots/Modal/Update/UpdateDepotModal';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import DepotTemplate from '@/components/templates/DepotTemplate';
import { Depot, GetDepotsQuery, UpdateDepotInput } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';

type DepotsProps = {
  data: GetDepotsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  searchCriteria: string | null;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentDepot: UpdateDepotInput;
  changeCurrentDepot: (depot: Depot) => void;
  addDepotModalState: boolean;
  updateDepotModalState: boolean;
  deleteDepotModalState: boolean;
  changeAddDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
};

const DepotsPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchCriteria,
  changeSearchCriteria,
  searchSubmitHandler,
  quickAction,
  quickActionLabel,
  currentDepot,
  changeCurrentDepot,
  addDepotModalState,
  updateDepotModalState,
  deleteDepotModalState,
  changeAddDepotModalState,
  changeUpdateDepotModalState,
  changeDeleteDepotModalState,
}: DepotsProps) => {
  return (
    <DepotTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={setMobileMenuOpen}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
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
            data={data}
            loading={loading}
            error={error}
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

export default DepotsPage;
