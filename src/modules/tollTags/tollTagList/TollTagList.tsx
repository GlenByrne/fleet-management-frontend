import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useState } from 'react';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { TollTag, useGetTollTagsQuery } from '@/generated/graphql';
import TollTagListItem from './TollTagListItem';

type TollTagListProps = {
  changeCurrentTollTag: (tollTag: TollTag) => void;
  changeAddTollTagModalState: (newState: boolean) => void;
  changeDeleteTollTagModalState: (newState: boolean) => void;
  changeUpdateTollTagModalState: (newState: boolean) => void;
};

function TollTagList({
  changeCurrentTollTag,
  changeAddTollTagModalState,
  changeDeleteTollTagModalState,
  changeUpdateTollTagModalState,
}: TollTagListProps) {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetTollTagsQuery({
    variables: {
      first: 5,
      data: {
        organisationId,
      },
    },
  });

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      first: 5,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const { hasNextPage } = data.tollTags.pageInfo;

  const tollTags = data.tollTags;

  return tollTags.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {tollTags.edges.map((tollTag) => (
          <TollTagListItem
            key={tollTag.node.id}
            tollTag={tollTag.node as TollTag}
            changeCurrentTollTag={changeCurrentTollTag}
            changeDeleteTollTagModalState={changeDeleteTollTagModalState}
            changeUpdateTollTagModalState={changeUpdateTollTagModalState}
          />
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
}

export default TollTagList;
