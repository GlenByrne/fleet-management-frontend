import Link from 'next/link';
import DeleteButton from '@/components/atoms/Button/DeleteButton';
import EditButton from '@/components/atoms/Button/EditButton';
import { TollTag } from '@/generated/graphql';

type TollTagListItemProps = {
  tollTag: TollTag;
  changeCurrentTollTag: (tollTag: TollTag) => void;
  changeDeleteTollTagModalState: (newState: boolean) => void;
  changeUpdateTollTagModalState: (newState: boolean) => void;
};

function TollTagListItem({
  tollTag,
  changeCurrentTollTag,
  changeDeleteTollTagModalState,
  changeUpdateTollTagModalState,
}: TollTagListItemProps) {
  return (
    <li>
      <Link href="#">
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {tollTag.tagNumber}
              </p>
              <div className="ml-2 flex shrink-0">
                <DeleteButton
                  onClick={() => {
                    changeCurrentTollTag(tollTag);
                    changeDeleteTollTagModalState(true);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Provider: {tollTag.tagProvider}
                </p>
              </div>
              <EditButton
                onClick={() => {
                  changeCurrentTollTag(tollTag);
                  changeUpdateTollTagModalState(true);
                }}
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default TollTagListItem;
