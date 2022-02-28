import {
  useGetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import UsersListItem from '@/modules/users/userList/UserListItem';
import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useState } from 'react';

type UserListProps = {
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  changeInviteUserModalState: (newState: boolean) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
};

const UserList = ({
  changeCurrentUser,
  changeInviteUserModalState,
  changeRemoveUserModalState,
  changeUpdateUserModalState,
}: UserListProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetUsersInOrganisationQuery({
    variables: {
      first: 5,
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first: 5,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const users = data.usersInOrganisation;

  return users.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users.edges.map((user) => (
          <UsersListItem
            key={user.node.user.id}
            user={user.node as UsersInOrganisationPayload}
            changeCurrentUser={changeCurrentUser}
            changeRemoveUserModalState={changeRemoveUserModalState}
            changeUpdateUserModalState={changeUpdateUserModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeInviteUserModalState(true)}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      text="Invite user to your organisation"
    />
  );
};

export default UserList;
