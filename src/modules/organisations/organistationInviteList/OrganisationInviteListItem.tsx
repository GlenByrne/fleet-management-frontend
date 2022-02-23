import CheckButton from '@/components/atoms/CheckButton';
import XButton from '@/components/atoms/Button/XButton';
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
  const [acceptInviteResult, acceptInvite] = useAcceptInviteMutation();

  const [declineInviteResult, declineInvite] = useDeclineInviteMutation();

  const handleAcceptInvite = async () => {
    try {
      const variables = {
        data: {
          organisationId: invite.organisation.id,
        },
      };
      await acceptInvite(variables);
    } catch {}
  };

  const handleDeclineInvite = async () => {
    try {
      const variables = {
        data: {
          organisationId: invite.organisation.id,
        },
      };
      await declineInvite(variables);
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
