import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { FuelCard, useGetFuelCardsQuery } from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import FuelCardListItem from './FuelCardListItem';

type FuelCardListProps = {
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  changeAddFuelCardModalState: (newState: boolean) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
};

function FuelCardList({
  changeCurrentFuelCard,
  changeAddFuelCardModalState,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListProps) {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetFuelCardsQuery({
    variables: {
      first: 5,
      data: {
        organisationId,
      },
    },
  });

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first: 5,
      data: {
        searchCriteria,
        organisationId,
      },
    });
  };

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div />;
  }

  const { fuelCards } = data;

  return fuelCards.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {fuelCards.edges.map((fuelCard) => (
          <FuelCardListItem
            key={fuelCard.node.id}
            fuelCard={fuelCard.node as FuelCard}
            changeCurrentFuelCard={changeCurrentFuelCard}
            changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
            changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddFuelCardModalState(true)}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      text="Add a new fuel card"
    />
  );
}

export default FuelCardList;
