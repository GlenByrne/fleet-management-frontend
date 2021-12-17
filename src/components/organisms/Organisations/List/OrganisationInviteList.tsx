import Loading from '@/components/atoms/Loading';
import {
  GetUsersOrganisationsInvitesQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import OrganisationInviteListItem from './OrganisationInviteListItem';

type OrganisationInviteListProps = {
  data: GetUsersOrganisationsInvitesQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const OrganisationInviteList = ({
  data,
  loading,
  error,
}: OrganisationInviteListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const invites = data.usersOrganisationInvites as UsersOnOrganisations[];

  return invites.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {invites.map((invite) => (
          <OrganisationInviteListItem
            key={invite.organisation.id}
            invite={invite}
          />
        ))}
      </ul>
    </div>
  ) : (
    <h2>No Invites</h2>
  );
};

export default OrganisationInviteList;
