import {
  addDepotModalStateVar,
  currentDepotVar,
} from 'constants/apollo-client';
import { DepotUpdateModalItem } from 'constants/types';
import Loading from 'core/Loading';
import { Depot, useGetDepotsQuery } from 'generated/graphql';
import DepotListItem from './DepotListItem';
import NoDepotAddButton from './NoDepotAddButton';

const DepotList = () => {
  const changeCurrentDepot = (depot: Depot) => {
    const chosenDepot: DepotUpdateModalItem = {
      id: depot.id,
      name: depot.name,
    };

    currentDepotVar(chosenDepot);
  };

  const { data, loading, error } = useGetDepotsQuery();

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
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoDepotAddButton onClick={addDepotModalStateVar} />
  );
};

export default DepotList;
