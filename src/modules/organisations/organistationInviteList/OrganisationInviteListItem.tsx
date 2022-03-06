import CheckButton from '@/components/atoms/Button/CheckButton';
import XButton from '@/components/atoms/Button/XButton';
import {
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
  const [acceptInvite] = useAcceptInviteMutation();

  const [declineInvite] = useDeclineInviteMutation();

  const handleAcceptInvite = async () => {
    try {
      const variables = {};
      await acceptInvite({
        variables: {
          data: {
            organisationId: invite.organisation.id,
          },
        },
      });
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
