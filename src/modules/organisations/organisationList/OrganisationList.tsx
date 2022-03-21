import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  useGetUsersOrganisationsQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import OrganisationListItem from './OrganisationListItem';

type OrganisationListProps = {
  changeAddOrganisationModalState: (newState: boolean) => void;
};

function OrganisationList({
  changeAddOrganisationModalState,
}: OrganisationListProps) {
  const { data, loading, error, fetchMore } = useGetUsersOrganisationsQuery({
    variables: {
      first: 10,
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && data?.usersOrganisations.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.usersOrganisations.pageInfo.endCursor,
        },
      });
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div />;
  }

  const organisations = data.usersOrganisations;
  const { hasNextPage } = data.usersOrganisations.pageInfo;

  return organisations.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {organisations.edges.map((organisation) => (
          <OrganisationListItem
            key={organisation.node.organisation.id}
            organisation={organisation.node as UsersOnOrganisations}
          />
        ))}
      </ul>
      {hasNextPage && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddOrganisationModalState(true)}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      text="Add a new toll tag"
    />
  );
}

export default OrganisationList;
