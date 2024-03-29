import Loading from '@/components/atoms/Loading';
import {
  GetInfringementsQuery,
  Infringement,
  InfringementEdge,
  InfringementStatus,
} from '@/generated/graphql';
import Link from 'next/link';
import { format } from 'date-fns';
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { getInfringementClassNames } from '@/utilities/getInfringementClassNames';
import { ApolloError } from '@apollo/client';
import NoListItemButton from '@/components/atoms/NoListItemButton';

type InfringementListProps = {
  data: GetInfringementsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentInfringement: (infringement: Infringement) => void;
  changeAddInfringementModalState: (newState: boolean) => void;
  changeDeleteInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementStatusModalState: (newState: boolean) => void;
};

const InfringementList = ({
  data,
  loading,
  error,
  changeCurrentInfringement,
  changeAddInfringementModalState,
  changeDeleteInfringementModalState,
  changeUpdateInfringementModalState,
  changeUpdateInfringementStatusModalState,
}: InfringementListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const infringements = data.infringements?.edges as InfringementEdge[];

  return infringements.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {infringements.map((infringement) => (
          <li key={infringement.node.id}>
            <Link href="#">
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {format(
                        new Date(infringement.node.dateOccured),
                        'dd/MM/yyyy'
                      )}
                    </p>
                    <div className="ml-2 flex shrink-0">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentInfringement(infringement.node);
                          changeDeleteInfringementModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Driver: {infringement.node.driver?.name}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            infringement.node.status !=
                            InfringementStatus.Signed
                          ) {
                            changeCurrentInfringement(infringement.node);
                            changeUpdateInfringementStatusModalState(true);
                          }
                        }}
                        className={getInfringementClassNames(
                          infringement.node.status
                        )}
                      >
                        {infringement.node.status}
                      </button>

                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {infringement.node.description}
                      </p>
                    </div>

                    <EditButton
                      onClick={() => {
                        changeCurrentInfringement(infringement.node);
                        changeUpdateInfringementModalState(true);
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
      onClick={() => changeAddInfringementModalState(true)}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      text="Add a new infringement"
    />
  );
};

export default InfringementList;
