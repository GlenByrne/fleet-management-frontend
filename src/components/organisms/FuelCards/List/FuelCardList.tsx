import { ApolloError, SubscribeToMoreOptions } from '@apollo/client';
import {
  Exact,
  FuelCard,
  FuelCardAddedDocument,
  FuelCardInputFilter,
  GetFuelCardsQuery,
} from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import Link from 'next/link';
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { useEffect } from 'react';

type FuelCardListProps = {
  data: GetFuelCardsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  subscribeToMore: <
    TSubscriptionData = GetFuelCardsQuery,
    TSubscriptionVariables = Exact<{
      data: FuelCardInputFilter;
    }>
  >(
    options: SubscribeToMoreOptions<
      GetFuelCardsQuery,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  changeAddFuelCardModalState: (newState: boolean) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
};

const FuelCardList = ({
  data,
  loading,
  error,
  subscribeToMore,
  changeCurrentFuelCard,
  changeAddFuelCardModalState,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListProps) => {
  // useEffect(() => {
  //   subscribeToMore({
  //     document: FuelCardAddedDocument,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newCard = subscriptionData.data.newCard;

  //       return Object.assign({}, prev, {
  //         fuelCards: [newCard, ...prev.fuelCards],
  //       });
  //     },
  //   });
  // }, []);

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
          <li key={fuelCard.id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {fuelCard.cardNumber}
                    </p>
                    <div className="ml-2 shrink-0 flex">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentFuelCard(fuelCard);
                          changeDeleteFuelCardModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Provider: {fuelCard.cardProvider}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentFuelCard(fuelCard);
                        changeUpdateFuelCardModalState(true);
                      }}
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
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
};

export default FuelCardList;
