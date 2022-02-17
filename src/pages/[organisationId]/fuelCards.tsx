import { NextPage } from 'next';
import FuelCardList from '@/components/organisms/FuelCards/List/FuelCardList';
import CreateFuelCardModal from '@/components/organisms/FuelCards/Modal/Create/CreateFuelCardModal';
import DeleteFuelCardModal from '@/components/organisms/FuelCards/Modal/Delete/DeleteFuelCardModal';
import UpdateFuelCardModal from '@/components/organisms/FuelCards/Modal/Update/UpdateFuelCardModal';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import FuelCardTemplate from '@/components/templates/FuelCardTemplate';
import {
  UpdateFuelCardInput,
  FuelCard,
  useGetFuelCardsQuery,
  useFuelCardAddedSubscription,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState, FormEvent, FormEventHandler } from 'react';
import { useSubscription } from 'urql';

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

  const first = 10;

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [fuelCards, refetchFuelCards] = useGetFuelCardsQuery({
    variables: {
      first,
      data: {
        organisationId,
      },
    },
  });

  // const handleSubscription = (fuelCards = [], response) => {
  //   return [response.newFuelCards, ...fuelCards];
  // };

  // const [res] = useFuelCardAddedSubscription(handleSubscription);

  const endCursor = fuelCards.data?.fuelCards.pageInfo.endCursor;

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetchFuelCards({
      first,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const fetchMoreFuelCards = () => {
    // fetchMore({
    //   variables: {
    //     after: endCursor,
    //   },
    // });
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
            searchCriteria={searchCriteria}
            currentFuelCard={currentFuelCard}
            modalState={deleteFuelCardModalState}
            changeModalState={changeDeleteFuelCardModalState}
          />
          <FuelCardList
            data={fuelCards.data}
            loading={fuelCards.fetching}
            error={fuelCards.error}
            // subscribeToMore={subscribeToMore}
            fetchMore={fetchMoreFuelCards}
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

export default FuelCards;
