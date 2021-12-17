import CheckButton from '@/components/atoms/CheckButton';
import XButton from '@/components/atoms/XButton';
import {
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import {
  GetUsersOrganisationsDocument,
  GetUsersOrganisationsInvitesDocument,
  GetUsersOrganisationsInvitesQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  UsersOnOrganisations,
} from '@/generated/graphql';

type OrganisationInvitesListItemProps = {
  invite: UsersOnOrganisations;
};

const OrganisationInviteListItem = ({
  invite,
}: OrganisationInvitesListItemProps) => {
  const [acceptInvite] = useAcceptInviteMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentOrganisationInvites =
        cache.readQuery<GetUsersOrganisationsInvitesQuery>({
          query: GetUsersOrganisationsInvitesDocument,
        });
      const newOrganisationInvites =
        currentOrganisationInvites?.usersOrganisationInvites?.filter((invite) =>
          invite != null
            ? invite.organisation.id !==
              mutationReturn?.acceptInvite.organisation.id
            : currentOrganisationInvites.usersOrganisationInvites
        );
      cache.writeQuery({
        query: GetUsersOrganisationsInvitesDocument,
        data: { usersOrganisationInvites: newOrganisationInvites },
      });
      cache.evict({
        id: mutationReturn?.acceptInvite.organisation.id,
      });
    },
    refetchQueries: [{ query: GetUsersOrganisationsDocument }],
  });

  const [declineInvite] = useDeclineInviteMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentOrganisationInvites =
        cache.readQuery<GetUsersOrganisationsInvitesQuery>({
          query: GetUsersOrganisationsInvitesDocument,
        });
      const newOrganisationInvites =
        currentOrganisationInvites?.usersOrganisationInvites?.filter((invite) =>
          invite != null
            ? invite.organisation.id !==
              mutationReturn?.declineInvite.organisationId
            : currentOrganisationInvites.usersOrganisationInvites
        );
      cache.writeQuery({
        query: GetUsersOrganisationsInvitesDocument,
        data: { usersOrganisationInvites: newOrganisationInvites },
      });
      cache.evict({
        id: mutationReturn?.declineInvite.organisationId,
      });
    },
  });

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite({
        variables: {
          data: {
            organisationId: invite.organisation.id,
          },
        },
      });

      successTextVar('Invite accepted');
      successAlertStateVar(true);
    } catch {}
  };

  const handleDeclineInvite = async () => {
    try {
      await declineInvite({
        variables: {
          data: {
            organisationId: invite.organisation.id,
          },
        },
      });

      successTextVar('Invite declined');
      successAlertStateVar(true);
    } catch {}
  };

  return (
    <li>
      <a className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between"></div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                {invite.organisation.name}
              </p>
            </div>
          </div>
        </div>
      </a>
      <CheckButton onClick={handleAcceptInvite} />
      <XButton onClick={handleDeclineInvite} />
    </li>
  );
};

export default OrganisationInviteListItem;
