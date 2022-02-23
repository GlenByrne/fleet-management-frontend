import {
  GetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { UseQueryState } from 'urql';
import UsersListItem from 'src/modules/users/userList/UserListItem';

type UserListProps = {
  variables: {
    first: number;
    after: string;
  };
  isLastPage: boolean;
  onLoadMore: (after: string) => void;
  usersList: UseQueryState<GetUsersInOrganisationQuery, object>;
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  changeInviteUserModalState: (newState: boolean) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
};

const UserList = ({
  variables,
  isLastPage,
  onLoadMore,
  usersList,
  changeCurrentUser,
  changeInviteUserModalState,
  changeRemoveUserModalState,
  changeUpdateUserModalState,
}: UserListProps) => {
  const { data, fetching, error } = usersList;

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const users = data.usersInOrganisation;

  return users?.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users?.map((user) => (
          <UsersListItem
            key={user?.user.id}
            user={user as UsersInOrganisationPayload}
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
