import {
  GetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from 'generated/graphql';
import Loading from 'core/Loading';
import UserListItem from './UserListItem';
import NoUsersAddButton from './NoUsersAddButton';
import {
  inviteUserModalStateVar,
  currentUserVar,
} from 'constants/apollo-client';
import { UserUpdateModalItem } from 'constants/types';
import { ApolloError } from '@apollo/client';

type UserListProps = {
  data: GetUsersInOrganisationQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const UserList = ({ data, loading, error }: UserListProps) => {
  const changeCurrentUser = (user: UsersInOrganisationPayload) => {
    const chosenUser: UserUpdateModalItem = {
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.role,
      depot: {
        id: user.depot != null ? user.depot.id : '',
        name: user.depot != null ? user.depot.name : '',
      },
    };
    currentUserVar(chosenUser);
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

  const users = data.usersInOrganisation as UsersInOrganisationPayload[];

  return users.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserListItem
            key={user.user.id}
            user={user}
            changeCurrentUser={changeCurrentUser}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoUsersAddButton onClick={inviteUserModalStateVar} />
  );
};

export default UserList;
