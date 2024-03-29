import { ApolloError, SubscribeToMoreOptions } from '@apollo/client';
import {
  Exact,
  FuelCard,
  FuelCardAddedDocument,
  FuelCardConnection,
  FuelCardsInput,
  GetFuelCardsQuery,
} from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import Link from 'next/link';
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { useEffect } from 'react';
import Button from '@/core/Table/Button';
import InView, { useInView } from 'react-intersection-observer';

type FuelCardListProps = {
  data: GetFuelCardsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  subscribeToMore: <
    TSubscriptionData = GetFuelCardsQuery,
    TSubscriptionVariables = Exact<{
      data: FuelCardsInput;
    }>
  >(
    options: SubscribeToMoreOptions<
      GetFuelCardsQuery,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
  fetchMore: () => void;
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
  fetchMore,
  changeCurrentFuelCard,
  changeAddFuelCardModalState,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListProps) => {
  // const { ref, inView } = useInView({});
  // useEffect(() => {
  //   // subscribeToMore({
  //   //   document: FuelCardAddedDocument,
  //   //   updateQuery: (prev, { subscriptionData }) => {
  //   //     if (!subscriptionData.data) return prev;
  //   //     const newCard = subscriptionData.data.fuelCards;

  //   //     return Object.assign({}, prev, {
  //   //       fuelCards: [newCard, ...prev.fuelCards],
  //   //     });
  //   //   },
  //   // });
  //   if (inView) {
  //     fetchMore();
  //   }
  // }, [inView]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.fuelCards?.pageInfo;

  const fuelCards = data.fuelCards as FuelCardConnection;

  return fuelCards.edges?.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {fuelCards.edges?.map((fuelCard) => (
          <li key={fuelCard?.node?.id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {fuelCard?.node?.cardNumber}
                    </p>
                    <div className="ml-2 flex shrink-0">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentFuelCard(fuelCard?.node);
                          changeDeleteFuelCardModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Provider: {fuelCard?.node?.cardProvider}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentFuelCard(fuelCard?.node);
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
      <InView
        onChange={() => {
          if (hasNextPage == true) {
            fetchMore();
          }
        }}
      >
        {({ inView, ref }) => (
          <div ref={ref}>{hasNextPage && inView && <Loading />}</div>
        )}
      </InView>
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
