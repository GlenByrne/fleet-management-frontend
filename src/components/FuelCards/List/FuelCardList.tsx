import { FuelCard, useGetFuelCardsQuery } from 'generated/graphql';
import { FuelCardUpdateModalItem } from 'constants/types';
import {
  addFuelCardModalStateVar,
  currentFuelCardVar,
} from 'constants/apollo-client';
import FuelCardListItem from './FuelCardListItem';
import NoFuelCardAddButton from './NoFuelCardAddButton';
import Loading from 'core/Loading';

const FuelCardList = () => {
  const changeCurrentFuelCard = (fuelCard: FuelCard) => {
    const chosenFuelCard: FuelCardUpdateModalItem = {
      id: fuelCard.id,
      cardNumber: fuelCard.cardNumber,
      cardProvider: fuelCard.cardProvider,
      depot: {
        id: fuelCard.depot != null ? fuelCard.depot.id : '',
        name: fuelCard.depot != null ? fuelCard.depot.name : '',
      },
    };
    currentFuelCardVar(chosenFuelCard);
  };

  const { data, loading, error } = useGetFuelCardsQuery();

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
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoFuelCardAddButton onClick={addFuelCardModalStateVar} />
  );
};

export default FuelCardList;
