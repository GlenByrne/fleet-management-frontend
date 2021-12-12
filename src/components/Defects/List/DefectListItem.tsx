import {
  deleteDefectModalStateVar,
  updateDefectModalStateVar,
} from '@/constants/apollo-client';
import Button from '@/core/Table/Button';
import { Defect } from '@/generated/graphql';
import {
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';

type DefectItemProps = {
  defect: Defect;
  changeCurrentDefect: (defect: Defect) => void;
};

const DefectListItem = ({ defect, changeCurrentDefect }: DefectItemProps) => {
  return (
    <li>
      <Link href="#">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {defect.description}
              </p>
              <div className="ml-2 shrink-0 flex">
                <Button
                  onClick={() => {
                    changeCurrentDefect(defect);
                    deleteDefectModalStateVar(true);
                  }}
                >
                  <TrashIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Reported By: {defect.reporter}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  Date Reported: {defect.dateReported}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <LocationMarkerIcon
                    className="shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Date Completed: {defect.dateCompleted}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  Status: {defect.status}
                </p>
              </div>
              <Button
                onClick={() => {
                  changeCurrentDefect(defect);
                  updateDefectModalStateVar(true);
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

export default DefectListItem;
