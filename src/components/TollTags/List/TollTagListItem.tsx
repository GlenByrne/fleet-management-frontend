import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import {
  deleteTollTagModalStateVar,
  updateTollTagModalStateVar,
} from 'constants/apollo-client';
import Button from 'core/Table/Button';
import { TollTag } from 'generated/graphql';

type TollTagListItemProps = {
  tollTag: TollTag;
  changeCurrentTollTag: (tollTag: TollTag) => void;
};

const TollTagListItem = ({
  tollTag,
  changeCurrentTollTag,
}: TollTagListItemProps) => {
  return (
    <li>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {tollTag.tagNumber}
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <Button
                onClick={() => {
                  changeCurrentTollTag(tollTag);
                  deleteTollTagModalStateVar(true);
                }}
              >
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                Provider: {tollTag.tagProvider}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <LocationMarkerIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {tollTag.depot?.name}
              </p>
            </div>
            <Button
              onClick={() => {
                changeCurrentTollTag(tollTag);
                updateTollTagModalStateVar(true);
              }}
            >
              <PencilIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </a>
    </li>
  );
};

export default TollTagListItem;
