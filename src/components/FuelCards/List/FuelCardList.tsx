import FuelCardListItem from './FuelCardListItem';
import NoFuelCardAddButton from './NoFuelCardAddButton';
import { ApolloError } from '@apollo/client';
import { FuelCard, GetFuelCardsQuery } from '@/generated/graphql';
import Loading from '@/core/Loading';

type FuelCardListProps = {
  data: GetFuelCardsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  changeAddFuelCardModalState: (newState: boolean) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
};

const FuelCardList = ({
  data,
  loading,
  error,
  changeCurrentFuelCard,
  changeAddFuelCardModalState,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const fuelCards = data.fuelCards as FuelCard[];

  return fuelCards.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fuelCards.map((fuelCard) => (
          <FuelCardListItem
            key={fuelCard.id}
            fuelCard={fuelCard}
            changeCurrentFuelCard={changeCurrentFuelCard}
            changeDeleteFuelCardModalState={changeDeleteFuelCardModalState}
            changeUpdateFuelCardModalState={changeUpdateFuelCardModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoFuelCardAddButton onClick={changeAddFuelCardModalState} />
  );
};

export default FuelCardList;
