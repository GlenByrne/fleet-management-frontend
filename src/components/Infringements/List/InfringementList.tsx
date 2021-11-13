import {
  addInfringementModalStateVar,
  currentInfringementVar,
} from 'constants/apollo-client';
import { InfringementUpdateModalItem } from 'constants/types';
import Loading from 'core/Loading';
import { Infringement, useGetInfringementsQuery } from 'generated/graphql';
import InfringementListItem from './InfringementListItem';
import NoInfringementsAddButton from './NoInfringementsAddButton';

const InfringementList = () => {
  const { data, loading, error } = useGetInfringementsQuery();

  const changeCurrentInfringement = (infringement: Infringement) => {
    const chosenInfringement: InfringementUpdateModalItem = {
      id: infringement.id,
      description: infringement.description,
      dateOccured: infringement.dateOccured,
      status: infringement.status,
    };
    currentInfringementVar(chosenInfringement);
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

  const infringements = data.infringements as Infringement[];

  return infringements.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {infringements.map((infringement) => (
          <InfringementListItem
            key={infringement.id}
            infringement={infringement}
            changeCurrentInfringement={changeCurrentInfringement}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoInfringementsAddButton onClick={addInfringementModalStateVar} />
  );
};

export default InfringementList;
