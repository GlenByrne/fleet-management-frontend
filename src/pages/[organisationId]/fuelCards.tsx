import { NextPage } from 'next';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import FuelCardTemplate from 'src/templates/FuelCardTemplate';
import { UpdateFuelCardInput, FuelCard } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CreateFuelCardModal from 'src/features/fuelCards/addFuelCardModal/CreateFuelCardModal';
import UpdateFuelCardModal from 'src/features/fuelCards/updateFuelCardModal/UpdateFuelCardModal';
import DeleteFuelCardModal from 'src/features/fuelCards/deleteFuelCardModal/DeleteFuelCardModal';
import FuelCardList from 'src/features/fuelCards/fuelCardList/FuelCardList';

const FuelCards: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

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

  const [pageVariables, setPageVariables] = useState([
    {
      first: 5,
      after: '',
    },
  ]);

  return (
    <>
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
            {pageVariables.map((variables, i) => (
              <FuelCardList
                key={'' + variables.after}
                variables={variables}
                isLastPage={i === pageVariables.length - 1}
                onLoadMore={(after: string) =>
                  setPageVariables([...pageVariables, { after, first: 10 }])
                }
                changeAddFuelCardModalState={changeAddFuelCardModalState}
                changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
                changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
                changeCurrentFuelCard={changeCurrentFuelCard}
              />
            ))}
          </>
        }
      />
    </>
  );
};

export default FuelCards;
