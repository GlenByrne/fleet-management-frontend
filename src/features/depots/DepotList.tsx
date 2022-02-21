import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  Depot,
  DepotConnection,
  DepotEdge,
  GetDepotsQuery,
} from '@/generated/graphql';
import Link from 'next/link';
import InView from 'react-intersection-observer';
import { CombinedError } from 'urql';

type DepotListProps = {
  data: GetDepotsQuery | undefined;
  loading: boolean;
  error: CombinedError | undefined;
  fetchMore: () => void;
  changeCurrentDepot: (depot: Depot) => void;
  changeAddDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

const DepotList = ({
  data,
  loading,
  error,
  fetchMore,
  changeCurrentDepot,
  changeAddDepotModalState,
  changeDeleteDepotModalState,
  changeUpdateDepotModalState,
}: DepotListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.depots?.pageInfo;

  const depots = data.depots.edges as DepotEdge[];

  return depots.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {depots.map((depot) => (
          <li key={depot.node.id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {depot?.node?.name}
                    </p>
                    <div className="ml-2 flex shrink-0">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentDepot(depot.node);
                          changeDeleteDepotModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Vehicles: {depot.node.vehicles.length}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentDepot(depot.node);
                        changeUpdateDepotModalState(true);
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
      onClick={() => changeAddDepotModalState(true)}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      text="Add a new depot"
    />
  );
};

export default DepotList;
