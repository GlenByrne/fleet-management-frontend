import DeleteButton from '@/components/Atomic/atoms/DeleteButton';
import EditButton from '@/components/Atomic/atoms/EditButton';
import Loading from '@/components/Atomic/atoms/Loading';
import NoListItemButton from '@/components/Atomic/atoms/NoListItemButton';
import { Depot, GetDepotsQuery } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import Link from 'next/link';

type DepotListProps = {
  data: GetDepotsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentDepot: (depot: Depot) => void;
  changeAddDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

const DepotList = ({
  data,
  loading,
  error,
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

  const depots = data.depots as Depot[];

  return depots.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {depots.map((depot) => (
          <li key={depot.id}>
            <Link href="#">
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {depot.name}
                    </p>
                    <div className="ml-2 shrink-0 flex">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentDepot(depot);
                          changeDeleteDepotModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Vehicles: {depot.vehicles.length}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentDepot(depot);
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
