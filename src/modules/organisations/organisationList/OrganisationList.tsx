import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import {
  GetUsersOrganisationsQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import { UseQueryState } from 'urql';
import OrganisationListItem from './OrganisationListItem';

type OrganisationListProps = {
  organisationList: UseQueryState<GetUsersOrganisationsQuery, object>;
  changeAddOrganisationModalState: (newState: boolean) => void;
};

const OrganisationList = ({
  organisationList,
  changeAddOrganisationModalState,
}: OrganisationListProps) => {
  const { data, fetching, error } = organisationList;

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const organisations = data.usersOrganisations;

  return organisations.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {organisations.map((organisation) => (
          <OrganisationListItem
            key={organisation?.organisation.id}
            organisation={organisation as UsersOnOrganisations}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddOrganisationModalState(true)}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      text="Add a new toll tag"
    />
  );
};

export default OrganisationList;
