import { FuelCard, useGetFuelCardsQuery } from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { FormEvent, FormEventHandler, useState } from 'react';
import InView from 'react-intersection-observer';
import { useRouter } from 'next/router';
import FuelCardListItem from './FuelCardListItem';

type FuelCardListProps = {
  variables: {
    first: number;
    after: string;
  };
  isLastPage: boolean;
  onLoadMore: (after: string) => void;
  changeCurrentFuelCard: (fuelCard: FuelCard) => void;
  changeAddFuelCardModalState: (newState: boolean) => void;
  changeDeleteFuelCardModalState: (newState: boolean) => void;
  changeUpdateFuelCardModalState: (newState: boolean) => void;
};

const FuelCardList = ({
  variables,
  isLastPage,
  onLoadMore,
  changeCurrentFuelCard,
  changeAddFuelCardModalState,
  changeDeleteFuelCardModalState,
  changeUpdateFuelCardModalState,
}: FuelCardListProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const [{ data, fetching, error }, refetchFuelCards] = useGetFuelCardsQuery({
    variables: {
      ...variables,
      data: {
        organisationId,
      },
    },
  });

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetchFuelCards({
      ...variables,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.fuelCards.pageInfo;

  const fuelCards = data.fuelCards;

  return fuelCards.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
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
      <InView
        onChange={() => {
          if (hasNextPage) {
            onLoadMore(fuelCards.pageInfo.endCursor as string);
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
};

export default FuelCardList;
