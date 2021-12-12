import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FuelCard,
  UpdateFuelCardInput,
  useGetFuelCardsQuery,
} from '@/generated/graphql';
import MainLayout from '@/core/Layout/MainLayout/MainLayout';
import CreateFuelCardModal from '@/components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from '@/components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from '@/components/FuelCards/Modal/Delete/DeleteFuelCardModal';
import FuelCardList from '@/components/FuelCards/List/FuelCardList';

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

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetFuelCardsQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={changeAddFuelCardModalState}
      quickActionLabel="New Card"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
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
    </MainLayout>
  );
};
export default FuelCards;
