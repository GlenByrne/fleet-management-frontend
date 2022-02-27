import Loading from '@/components/atoms/Loading';
import {
  useGetUsersOrganisationInvitesQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import OrganisationInviteListItem from './OrganisationInviteListItem';

const OrganisationInviteList = () => {
  const { data, loading, error, fetchMore } =
    useGetUsersOrganisationInvitesQuery({
      variables: {
        first: 10,
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && data?.usersOrganisationInvites.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.usersOrganisationInvites.pageInfo.endCursor,
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
    return <div></div>;
  }

  const invites = data.usersOrganisationInvites;
  const { hasNextPage } = data.usersOrganisationInvites.pageInfo;

  return invites.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {invites.edges.map((invite) => (
          <OrganisationInviteListItem
            key={invite.node.organisation.id}
            invite={invite.node as UsersOnOrganisations}
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
    <h2>No Invites</h2>
  );
};

export default OrganisationInviteList;
