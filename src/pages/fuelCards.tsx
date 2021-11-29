import { NextPage } from 'next';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from 'components/FuelCards/Modal/Delete/DeleteFuelCardModal';
import {
  addFuelCardModalStateVar,
  currentOrganisationVar,
} from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetFuelCardsQuery } from 'generated/graphql';
import MainLayout from 'core/Layout/MainLayout/MainLayout';

const FuelCards: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetFuelCardsQuery({
    variables: {
      data: {
        organisationId: currentOrganisationVar(),
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
        organisationId: currentOrganisationVar(),
      },
    });
  };

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={addFuelCardModalStateVar}
      quickActionLabel="New Card"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateFuelCardModal />
      <UpdateFuelCardModal />
      <DeleteFuelCardModal />
      <FuelCardList data={data} loading={loading} error={error} />
    </MainLayout>
  );
};
export default FuelCards;
