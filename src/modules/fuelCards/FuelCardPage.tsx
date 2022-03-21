import { useState } from 'react';
import FuelCardTemplate from 'src/templates/FuelCardTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { FuelCard, UpdateFuelCardInput } from '@/generated/graphql';
import CreateFuelCardModal from './addFuelCardModal/CreateFuelCardModal';
import DeleteFuelCardModal from './deleteFuelCardModal/DeleteFuelCardModal';
import FuelCardList from './fuelCardList/FuelCardList';
import UpdateFuelCardModal from './updateFuelCardModal/UpdateFuelCardModal';

function FuelCardPage() {
  const [addFuelCardModalState, setAddFuelCardModalState] = useState(false);
  const [updateFuelCardModalState, setUpdateFuelCardModalState] =
    useState(false);
  const [deleteFuelCardModalState, setDeleteFuelCardModalState] =
    useState(false);

  const [currentFuelCard, setCurrentFuelCard] = useState<UpdateFuelCardInput>({
    id: '',
    cardNumber: '',
    cardProvider: '',
  });

  const changeAddFuelCardModalState = (newState: boolean) => {
    setAddFuelCardModalState(newState);
  };

  const changeUpdateFuelCardModalState = (newState: boolean) => {
    setUpdateFuelCardModalState(newState);
  };

  const changeDeleteFuelCardModalState = (newState: boolean) => {
    setDeleteFuelCardModalState(newState);
  };

  const changeCurrentFuelCard = (fuelCard: FuelCard) => {
    const chosenFuelCard: UpdateFuelCardInput = {
      id: fuelCard.id,
      cardNumber: fuelCard.cardNumber,
      cardProvider: fuelCard.cardProvider,
    };
    setCurrentFuelCard(chosenFuelCard);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <FuelCardTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={changeAddFuelCardModalState}
          quickActionLabel="New Card"
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
            currentFuelCard={currentFuelCard}
            modalState={deleteFuelCardModalState}
            changeModalState={changeDeleteFuelCardModalState}
          />
          <FuelCardList
            changeAddFuelCardModalState={changeAddFuelCardModalState}
            changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
            changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
            changeCurrentFuelCard={changeCurrentFuelCard}
          />
        </>
      }
    />
  );
}

export default FuelCardPage;
