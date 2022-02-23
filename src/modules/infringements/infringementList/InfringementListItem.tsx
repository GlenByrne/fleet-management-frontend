import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { Infringement, InfringementStatus } from '@/generated/graphql';
import { getInfringementClassNames } from '@/utilities/getInfringementClassNames';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { format } from 'date-fns';
import React from 'react';

type InfringementListItemProps = {
  infringement: Infringement;
  changeCurrentInfringement: (infringement: Infringement) => void;
  changeDeleteInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementStatusModalState: (newState: boolean) => void;
};

const InfringementListItem = ({
  infringement,
  changeCurrentInfringement,
  changeDeleteInfringementModalState,
  changeUpdateInfringementModalState,
  changeUpdateInfringementStatusModalState,
}: InfringementListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {format(new Date(infringement.dateOccured), 'dd/MM/yyyy')}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentInfringement(infringement);
                    changeDeleteInfringementModalState(true);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Driver: {infringement.driver?.name}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    if (infringement.status != InfringementStatus.Signed) {
                      changeCurrentInfringement(infringement);
                      changeUpdateInfringementStatusModalState(true);
                    }
                  }}
                  className={getInfringementClassNames(infringement.status)}
                >
                  {infringement.status}
                </button>

                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {infringement.description}
                </p>
              </div>

              <EditButton
                onClick={() => {
                  changeCurrentInfringement(infringement);
                  changeUpdateInfringementModalState(true);
                }}
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default InfringementListItem;
