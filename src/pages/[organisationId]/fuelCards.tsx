import { NextPage } from 'next';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from 'components/FuelCards/Modal/Delete/DeleteFuelCardModal';
import { addFuelCardModalStateVar } from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetFuelCardsQuery } from 'generated/graphql';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import useAuthentication from 'hooks/useAuthentication';
import Loading from 'core/Loading';
import { useRouter } from 'next/router';

const FuelCards: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

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