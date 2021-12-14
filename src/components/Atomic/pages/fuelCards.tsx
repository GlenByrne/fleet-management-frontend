import HeaderWithSearchBarAndQuickActionButton from '@/components/Atomic/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/Atomic/organisms/SideNav';
import FuelCardTemplate from '@/components/Atomic/templates/FuelCardTemplate';
import FuelCardList from '@/components/Atomic/organisms/FuelCards/List/FuelCardList';
import CreateFuelCardModal from '@/components/Atomic/organisms/FuelCards/Modal/Create/CreateFuelCardModal';
import DeleteFuelCardModal from '@/components/Atomic/organisms/FuelCards/Modal/Delete/DeleteFuelCardModal';
import UpdateFuelCardModal from '@/components/Atomic/organisms/FuelCards/Modal/Update/UpdateFuelCardModal';
import {
  FuelCard,
  GetFuelCardsQuery,
  UpdateFuelCardInput,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';

type FuelCardsProps = {
  data: GetFuelCardsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  searchCriteria: string | null;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentFuelCard: UpdateFuelCardInput;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  addFuelCardModalState: boolean;
  updateFuelCardModalState: boolean;
  deleteFuelCardModalState: boolean;
  changeAddFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
};

const FuelCardsPage = ({
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
  currentFuelCard,
  changeCurrentFuelCard,
  addFuelCardModalState,
  updateFuelCardModalState,
  deleteFuelCardModalState,
  changeAddFuelCardModalState,
  changeUpdateFuelCardModalState,
  changeDeleteFuelCardModalState,
}: FuelCardsProps) => {
  return (
    <FuelCardTemplate
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
          <CreateFuelCardModal
            modalState={addFuelCardModalState}
            changeModalState={changeAddFuelCardModalState}
          />
          <UpdateFuelCardModal
            currentFuelCard={currentFuelCard}
            modalState={updateFuelCardModalState}
            changeModalState={changeUpdateFuelCardModalState}
          />
          <DeleteFuelCardModal
            searchCriteria={searchCriteria}
            currentFuelCard={currentFuelCard}
            modalState={deleteFuelCardModalState}
            changeModalState={changeDeleteFuelCardModalState}
          />
          <FuelCardList
            data={data}
            loading={loading}
            error={error}
            changeAddFuelCardModalState={changeAddFuelCardModalState}
            changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
            changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
            changeCurrentFuelCard={changeCurrentFuelCard}
          />
        </>
      }
    />
  );
};

export default FuelCardsPage;
