import UserListItem from './UserListItem';
import NoUsersAddButton from './NoUsersAddButton';
import { ApolloError } from '@apollo/client';
import {
  GetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import Loading from '@/core/Loading';

type UserListProps = {
  data: GetUsersInOrganisationQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  changeInviteUserModalState: (newState: boolean) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
};

const UserList = ({
  data,
  loading,
  error,
  changeCurrentUser,
  changeInviteUserModalState,
  changeRemoveUserModalState,
  changeUpdateUserModalState,
}: UserListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const users = data.usersInOrganisation as UsersInOrganisationPayload[];

  return users.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserListItem
            key={user.user.id}
            user={user}
            changeCurrentUser={changeCurrentUser}
            changeRemoveUserModalState={changeRemoveUserModalState}
            changeUpdateUserModalState={changeUpdateUserModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoUsersAddButton onClick={changeInviteUserModalState} />
  );
};

export default UserList;
