import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { Infringement, InfringementStatus } from 'generated/graphql';
import Link from 'next/link';
import { getInfringementClassNames } from 'utilities/getInfringementClassNames';
import { format } from 'date-fns';
import Button from 'core/Table/Button';
import {
  deleteInfringementModalStateVar,
  updateInfringementModalStateVar,
  updateInfringementStatusModalStateVar,
} from 'constants/apollo-client';

type InfringementListItemProps = {
  infringement: Infringement;
  changeCurrentInfringement: (infringement: Infringement) => void;
};

const InfringementListItem = ({
  infringement,
  changeCurrentInfringement,
}: InfringementListItemProps) => {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {format(new Date(infringement.dateOccured), 'dd/MM/yyyy')}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentInfringement(infringement);
                    deleteInfringementModalStateVar(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
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
                      updateInfringementStatusModalStateVar(true);
                    }
                  }}
                  className={getInfringementClassNames(infringement.status)}
                >
                  {infringement.status}
                </button>

                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {infringement.description}
                </p>
              </div>
              <Button
                onClick={() => {
                  changeCurrentInfringement(infringement);
                  updateInfringementModalStateVar(true);
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

export default InfringementListItem;
