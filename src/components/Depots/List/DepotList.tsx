import Loading from '@/components/Atomic/atoms/Loading';
import { Depot, GetDepotsQuery, UpdateDepotInput } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import DepotListItem from './DepotListItem';
import NoDepotAddButton from './NoDepotAddButton';

type DepotListProps = {
  data: GetDepotsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  changeCurrentDepot: (depot: Depot) => void;
  changeAddDepotModalState: (newState: boolean) => void;
  changeDeleteDepotModalState: (newState: boolean) => void;
  changeUpdateDepotModalState: (newState: boolean) => void;
};

const DepotList = ({
  data,
  loading,
  error,
  changeCurrentDepot,
  changeAddDepotModalState,
  changeDeleteDepotModalState,
  changeUpdateDepotModalState,
}: DepotListProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const depots = data.depots as Depot[];

  return depots.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {depots.map((depot) => (
          <DepotListItem
            key={depot.id}
            depot={depot}
            changeCurrentDepot={changeCurrentDepot}
            changeDeleteDepotModalState={changeDeleteDepotModalState}
            changeUpdateDepotModalState={changeUpdateDepotModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoDepotAddButton onClick={changeAddDepotModalState} />
  );
};

export default DepotList;
