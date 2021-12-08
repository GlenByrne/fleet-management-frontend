import {
  deleteDepotModalStateVar,
  updateDepotModalStateVar,
} from '@/constants/apollo-client';
import Button from '@/core/Table/Button';
import { Depot } from '@/generated/graphql';
import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';

type DepotListItemProps = {
  depot: Depot;
  changeCurrentDepot: (depot: Depot) => void;
};

const DepotListItem = ({ depot, changeCurrentDepot }: DepotListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {depot.name}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentDepot(depot);
                    deleteDepotModalStateVar(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Vehicles: {depot.vehicles.length}
                </p>
              </div>
              <Button
                onClick={() => {
                  changeCurrentDepot(depot);
                  updateDepotModalStateVar(true);
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

export default DepotListItem;
