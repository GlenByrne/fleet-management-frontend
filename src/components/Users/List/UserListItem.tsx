import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  deleteUserModalStateVar,
  updateUserModalStateVar,
} from 'constants/apollo-client';
import Button from 'core/Table/Button';
import { UsersPayload } from 'generated/graphql';
import Link from 'next/link';

type UserListItemProps = {
  user: UsersPayload;
  changeCurrentUser: (user: UsersPayload) => void;
};

const UserListItem = ({ user, changeCurrentUser }: UserListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {user.name}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentUser(user);
                    deleteUserModalStateVar(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Email: {user.email}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {user.depot ? user.depot.name : 'None'}
                </p>
              </div>
              <Button
                onClick={() => {
                  changeCurrentUser(user);
                  updateUserModalStateVar(true);
                }}
              >
                <PencilIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default UserListItem;
