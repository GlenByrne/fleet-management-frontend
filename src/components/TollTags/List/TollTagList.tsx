import { TollTagUpdateModalItem } from '@/constants/types';
import Loading from '@/core/Loading';
import { GetTollTagsQuery, TollTag } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import NoTollTagAddButton from './NoTollTagAddButton';
import TollTagListItem from './TollTagListItem';

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
          <TollTagListItem
            key={tollTag.id}
            tollTag={tollTag}
            changeCurrentTollTag={changeCurrentTollTag}
            changeDeleteTollTagModalState={changeDeleteTollTagModalState}
            changeUpdateTollTagModalState={changeUpdateTollTagModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoTollTagAddButton onClick={changeAddTollTagModalState} />
  );
};

export default TollTagList;
