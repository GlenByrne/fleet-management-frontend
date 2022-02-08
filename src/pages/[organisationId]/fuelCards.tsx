import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FuelCard,
  UpdateFuelCardInput,
  useGetFuelCardsQuery,
} from '@/generated/graphql';
import FuelCardsPage from '@/components/pages/fuelCards';

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
    <FuelCardsPage
      data={data}
      loading={loading}
      error={error}
      fetchMore={fetchMoreFuelCards}
      subscribeToMore={subscribeToMore}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      searchCriteria={searchCriteria}
      changeSearchCriteria={changeSearchCriteria}
      searchSubmitHandler={searchSubmitHandler}
      quickAction={changeAddFuelCardModalState}
      quickActionLabel="New Card"
      currentFuelCard={currentFuelCard}
      changeCurrentFuelCard={changeCurrentFuelCard}
      addFuelCardModalState={addFuelCardModalState}
      updateFuelCardModalState={updateFuelCardModalState}
      deleteFuelCardModalState={deleteFuelCardModalState}
      changeAddFuelCardModalState={changeAddFuelCardModalState}
      changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
      changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
    />
  );
};

// export async function getServerSideProps() {
//   const { data, loading, error, refetch, subscribeToMore } = await useGetFuelCardsQuery({
//     variables: {
//       data: {
//         organisationId,
//       },
//     },
//   });

//   return {
//     props: {

//     }
//   }
// }

export default FuelCards;
