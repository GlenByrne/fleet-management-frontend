import Loading from '@/core/Loading';
import {
  Organisation,
  useGetUsersOrganisationsQuery,
  UsersOnOrganisations,
} from '@/generated/graphql';
import NoOrganisationsAddButton from './NoOrganisationsAddButton';
import OrganisationsListItem from './OrganisationsListItem';

type OrganisationListProps = {
  changeAddOrganisationModalState: (newState: boolean) => void;
};

const OrganisationsList = ({
  changeAddOrganisationModalState,
}: OrganisationListProps) => {
  const { data, loading, error } = useGetUsersOrganisationsQuery();

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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {organisations.map((organisation) => (
          <OrganisationsListItem
            key={organisation.organisation.id}
            organisation={organisation}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoOrganisationsAddButton onClick={changeAddOrganisationModalState} />
  );
};

export default OrganisationsList;
