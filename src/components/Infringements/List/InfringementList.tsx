import Loading from '@/components/Atomic/atoms/Loading';
import { Infringement, useGetInfringementsQuery } from '@/generated/graphql';
import InfringementListItem from './InfringementListItem';
import NoInfringementsAddButton from './NoInfringementsAddButton';

type InfringementListProps = {
  changeCurrentInfringement: (infringement: Infringement) => void;
  changeAddInfringementModalState: (newState: boolean) => void;
  changeDeleteInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementStatusModalState: (newState: boolean) => void;
};

const InfringementList = ({
  changeCurrentInfringement,
  changeAddInfringementModalState,
  changeDeleteInfringementModalState,
  changeUpdateInfringementModalState,
  changeUpdateInfringementStatusModalState,
}: InfringementListProps) => {
  const { data, loading, error } = useGetInfringementsQuery();

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
            changeDeleteInfringementModalState={
              changeDeleteInfringementModalState
            }
            changeUpdateInfringementModalState={
              changeUpdateInfringementModalState
            }
            changeUpdateInfringementStatusModalState={
              changeUpdateInfringementStatusModalState
            }
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoInfringementsAddButton onClick={changeAddInfringementModalState} />
  );
};

export default InfringementList;
