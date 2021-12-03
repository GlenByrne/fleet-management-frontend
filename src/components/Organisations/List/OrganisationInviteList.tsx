import { addOrganisationModalStateVar } from 'constants/apollo-client';
import Loading from 'core/Loading';
import {
  useGetUsersOrganisationsInvitesQuery,
  useGetUsersOrganisationsQuery,
  UsersOnOrganisations,
} from 'generated/graphql';
import NoOrganisationsAddButton from './NoOrganisationsAddButton';
import OrganisationInviteListItem from './OrganisationInviteListItem';
import OrganisationsListItem from './OrganisationsListItem';

const OrganisationInviteList = () => {
  const { data, loading, error } = useGetUsersOrganisationsInvitesQuery();

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
