import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { UsersInOrganisationPayload } from '@/generated/graphql';

type UserListItemProps = {
  user: UsersInOrganisationPayload;
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
};

function UserListItem({
  user,
  changeCurrentUser,
  changeRemoveUserModalState,
  changeUpdateUserModalState,
}: UserListItemProps) {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {user.user.name}
              </p>
              <div className="ml-2 flex shrink-0">
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
                    className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
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
  );
}

export default UserListItem;
