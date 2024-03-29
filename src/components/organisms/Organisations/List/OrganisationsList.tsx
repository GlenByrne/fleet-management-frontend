import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  GetUsersOrganisationsQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import Link from 'next/link';

type OrganisationListProps = {
  data: GetUsersOrganisationsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeAddOrganisationModalState: (newState: boolean) => void;
};

const OrganisationsList = ({
  data,
  loading,
  error,
  changeAddOrganisationModalState,
}: OrganisationListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const organisations = data.usersOrganisations as UsersOnOrganisations[];

  return organisations.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {organisations.map((organisation) => (
          <li key={organisation.organisation.id}>
            <Link
              href={`/${encodeURIComponent(
                organisation.organisation.id
              )}/dashboard`}
            >
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between"></div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {organisation.organisation.name}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        {organisation.role}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    // <NoOrganisationsAddButton onClick={changeAddOrganisationModalState} />
    <NoListItemButton
      onClick={() => changeAddOrganisationModalState(true)}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      text="Add a new toll tag"
    />
  );
};

export default OrganisationsList;
