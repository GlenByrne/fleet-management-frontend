import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  Depot,
  DepotEdge,
  GetDepotsQuery,
  GetDepotsWithVehiclesQuery,
} from '@/generated/graphql';
import Link from 'next/link';
import InView from 'react-intersection-observer';
import { UseQueryState } from 'urql';
import DepotListItem from './DepotListItem';

type DepotListProps = {
  depotList: UseQueryState<GetDepotsWithVehiclesQuery, object>;
  fetchMore: () => void;
  changeCurrentDepot: (depot: Depot) => void;
  changeAddDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

const DepotList = ({
  depotList,
  fetchMore,
  changeCurrentDepot,
  changeAddDepotModalState,
  changeDeleteDepotModalState,
  changeUpdateDepotModalState,
}: DepotListProps) => {
  const { data, fetching, error } = depotList;

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.depots.pageInfo;

  const depots = data.depots;

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
      onClick={() => changeAddDepotModalState(true)}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      text="Add a new depot"
    />
  );
};

export default DepotList;
