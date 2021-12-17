import DeleteButton from '@/components/atoms/DeleteButton';
import EditButton from '@/components/atoms/EditButton';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { GetTollTagsQuery, TollTag } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import Link from 'next/link';

type TollTagListProps = {
  data: GetTollTagsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentTollTag: (tollTag: TollTag) => void;
  changeAddTollTagModalState: (newState: boolean) => void;
  changeDeleteTollTagModalState: (newState: boolean) => void;
  changeUpdateTollTagModalState: (newState: boolean) => void;
};

const TollTagList = ({
  data,
  loading,
  error,
  changeCurrentTollTag,
  changeAddTollTagModalState,
  changeDeleteTollTagModalState,
  changeUpdateTollTagModalState,
}: TollTagListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const tollTags = data.tollTags as TollTag[];

  return tollTags.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {tollTags.map((tollTag) => (
          <li key={tollTag.id}>
            <Link href="#">
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {tollTag.tagNumber}
                    </p>
                    <div className="ml-2 shrink-0 flex">
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
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddTollTagModalState(true)}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      text="Add a new toll tag"
    />
  );
};

export default TollTagList;
