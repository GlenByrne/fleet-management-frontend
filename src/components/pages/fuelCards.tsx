import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import FuelCardTemplate from '@/components/templates/FuelCardTemplate';
import FuelCardList from '@/components/organisms/FuelCards/List/FuelCardList';
import CreateFuelCardModal from '@/components/organisms/FuelCards/Modal/Create/CreateFuelCardModal';
import DeleteFuelCardModal from '@/components/organisms/FuelCards/Modal/Delete/DeleteFuelCardModal';
import UpdateFuelCardModal from '@/components/organisms/FuelCards/Modal/Update/UpdateFuelCardModal';
import {
  FuelCard,
  UpdateFuelCardInput,
  useGetFuelCardsQuery,
} from '@/generated/graphql';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

const FuelCardsPage = () => {
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
  const { data, loading, error, fetchMore, refetch, subscribeToMore } =
    useGetFuelCardsQuery({
      variables: {
        first,
        data: {
          organisationId,
        },
      },
    });

  const endCursor = data?.fuelCards?.pageInfo?.endCursor;

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const fetchMoreFuelCards = () => {
    fetchMore({
      variables: {
        after: endCursor,
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
            data={data}
            loading={loading}
            error={error}
            subscribeToMore={subscribeToMore}
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

export default FuelCardsPage;
