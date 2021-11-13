import { ApolloError } from '@apollo/client';
import {
  addTollTagModalStateVar,
  currentTollTagVar,
} from 'constants/apollo-client';
import { TollTagUpdateModalItem } from 'constants/types';
import Loading from 'core/Loading';
import { GetTollTagsQuery, TollTag } from 'generated/graphql';
import NoTollTagAddButton from './NoTollTagAddButton';
import TollTagListItem from './TollTagListItem';

type TollTagListProps = {
  data: GetTollTagsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const TollTagList = ({ data, loading, error }: TollTagListProps) => {
  const changeCurrentTollTag = (tollTag: TollTag) => {
    const chosenTollTag: TollTagUpdateModalItem = {
      id: tollTag.id,
      tagNumber: tollTag.tagNumber,
      tagProvider: tollTag.tagProvider,
    };
    currentTollTagVar(chosenTollTag);
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

  const tollTags = data.tollTags as TollTag[];

  return tollTags.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {tollTags.map((tollTag) => (
          <TollTagListItem
            key={tollTag.id}
            tollTag={tollTag}
            changeCurrentTollTag={changeCurrentTollTag}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoTollTagAddButton onClick={addTollTagModalStateVar} />
  );
};

export default TollTagList;
