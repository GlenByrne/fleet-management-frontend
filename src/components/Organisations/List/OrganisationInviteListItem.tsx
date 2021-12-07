import {
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import Button from '@/core/Table/Button';
import {
  GetUsersOrganisationsDocument,
  GetUsersOrganisationsInvitesDocument,
  GetUsersOrganisationsInvitesQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { CheckIcon, XIcon } from '@heroicons/react/solid';

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
      <Button onClick={handleAcceptInvite}>
        <CheckIcon className="h-6 w-6" aria-hidden="true" />
      </Button>
      <Button onClick={handleDeclineInvite}>
        <XIcon className="h-6 w-6" aria-hidden="true" />
      </Button>
    </li>
  );
};

export default OrganisationInviteListItem;
