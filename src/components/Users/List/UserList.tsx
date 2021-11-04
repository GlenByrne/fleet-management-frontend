import { useGetUsersQuery, UsersPayload } from 'generated/graphql';
import Loading from 'core/Loading';
import UserListItem from './UserListItem';
import NoUsersAddButton from './NoUsersAddButton';
import { addUserModalStateVar, currentUserVar } from 'constants/apollo-client';
import { UserUpdateModalItem } from 'constants/types';

const UserList = () => {
  const changeCurrentUser = (user: UsersPayload) => {
    const chosenUser: UserUpdateModalItem = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      depot: {
        id: user.depot != null ? user.depot.id : '',
        name: user.depot != null ? user.depot.name : '',
      },
    };
    currentUserVar(chosenUser);
  };

  const { data, loading, error } = useGetUsersQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const users = data.users as UsersPayload[];

  return users.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            changeCurrentUser={changeCurrentUser}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoUsersAddButton onClick={addUserModalStateVar} />
  );
};

export default UserList;
