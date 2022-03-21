import { LocationMarkerIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { Defect } from '@/generated/graphql';

type DefectListItemProps = {
  defect: Defect;
  changeCurrentDefect: (defect: Defect) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
};

function DefectListItem({
  defect,
  changeCurrentDefect,
  changeDeleteDefectModalState,
  changeUpdateDefectModalState,
}: DefectListItemProps) {
  return (
    <li>
      <Link href="#">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {defect.description}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentDefect(defect);
                    changeDeleteDefectModalState(true);
                  }}
                />
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
                    className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Date Completed: {defect.dateCompleted}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  Status: {defect.status}
                </p>
              </div>
              <EditButton
                onClick={() => {
                  changeCurrentDefect(defect);
                  changeUpdateDefectModalState(true);
                }}
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default DefectListItem;
