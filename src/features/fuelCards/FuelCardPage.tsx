import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import {
  FuelCard,
  UpdateFuelCardInput,
  useGetFuelCardsQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import FuelCardTemplate from 'src/templates/FuelCardTemplate';
import CreateFuelCardModal from './addFuelCardModal/CreateFuelCardModal';
import DeleteFuelCardModal from './deleteFuelCardModal/DeleteFuelCardModal';
import FuelCardList from './fuelCardList/FuelCardList';
import UpdateFuelCardModal from './updateFuelCardModal/UpdateFuelCardModal';

const FuelCardPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [pageVariables, setPageVariables] = useState([
    {
      first: 5,
      after: '',
    },
  ]);
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

  const [fuelCards, refetchFuelCards] = useGetFuelCardsQuery({
    variables: {
      ...pageVariables,
      data: {
        organisationId,
      },
    },
  });

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetchFuelCards({
      ...pageVariables,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
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
          {pageVariables.map((variables, i) => (
            <FuelCardList
              key={'' + variables.after}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              onLoadMore={(after: string) =>
                setPageVariables([...pageVariables, { after, first: 10 }])
              }
              fuelCardsList={fuelCards}
              changeAddFuelCardModalState={changeAddFuelCardModalState}
              changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
              changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
              changeCurrentFuelCard={changeCurrentFuelCard}
            />
          ))}
        </>
      }
    />
  );
};

export default FuelCardPage;
