import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { Depot } from '@/generated/graphql';

type DepotListItemProps = {
  depot: Depot;
  changeCurrentDepot: (depot: Depot) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

function DepotListItem({
  depot,
  changeCurrentDepot,
  changeDeleteDepotModalState,
  changeUpdateDepotModalState,
}: DepotListItemProps) {
  return (
    <li>
      <Link href="#">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {depot.name}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentDepot(depot);
                    changeDeleteDepotModalState(true);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Vehicles: {depot.vehicles.length}
                </p>
              </div>
              <EditButton
                onClick={() => {
                  changeCurrentDepot(depot);
                  changeUpdateDepotModalState(true);
                }}
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default DepotListItem;
