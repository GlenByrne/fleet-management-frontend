import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useState } from 'react';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { Depot, useGetDepotsQuery } from '@/generated/graphql';
import DepotListItem from './DepotListItem';

type DepotListProps = {
  changeCurrentDepot: (depot: Depot) => void;
  changeAddDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

function DepotList({
  changeCurrentDepot,
  changeAddDepotModalState,
  changeDeleteDepotModalState,
  changeUpdateDepotModalState,
}: DepotListProps) {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetDepotsQuery({
    variables: {
      first: 10,
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first: 10,
      data: {
        searchCriteria,
        organisationId,
      },
    });
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

  const { hasNextPage } = data.depots.pageInfo;

  const { depots } = data;

  return depots.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {depots.edges.map((depot) => (
          <DepotListItem
            key={depot.node.id}
            depot={depot.node as Depot}
            changeCurrentDepot={changeCurrentDepot}
            changeDeleteDepotModalState={changeDeleteDepotModalState}
            changeUpdateDepotModalState={changeUpdateDepotModalState}
          />
        ))}
      </ul>
      {/* <InView
        onChange={() => {
          if (hasNextPage == true) {
            fetchMore();
          }
        }}
      >
        {({ inView, ref }) => (
          <div ref={ref}>{hasNextPage && inView && <Loading />}</div>
        )}
      </InView> */}
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddDepotModalState(true)}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      text="Add a new depot"
    />
  );
}

export default DepotList;
