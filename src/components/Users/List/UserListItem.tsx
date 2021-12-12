import Button from '@/core/Table/Button';
import { UsersInOrganisationPayload } from '@/generated/graphql';
import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';

type UserListItemProps = {
  user: UsersInOrganisationPayload;
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
};

const UserListItem = ({
  user,
  changeCurrentUser,
  changeRemoveUserModalState,
  changeUpdateUserModalState,
}: UserListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {user.user.name}
              </p>
              <div className="ml-2 shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentUser(user);
                    changeRemoveUserModalState(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
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
              <Button
                onClick={() => {
                  changeCurrentUser(user);
                  changeUpdateUserModalState(true);
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
