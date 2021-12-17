import { ApolloError } from '@apollo/client';
import {
  GetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import Loading from '@/components/atoms/Loading';
import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import NoListItemButton from '@/components/atoms/NoListItemButton';

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
          <li key={user.user.id}>
            <Link href="#">
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {user.user.name}
                    </p>
                    <div className="ml-2 shrink-0 flex">
                      <DeleteButton
                        onClick={() => {
                          changeCurrentUser(user);
                          changeRemoveUserModalState(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Email: {user.user.email}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {/* {user.depot ? user.depot.name : 'None'} */}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        changeCurrentUser(user);
                        changeUpdateUserModalState(true);
                      }}
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
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
