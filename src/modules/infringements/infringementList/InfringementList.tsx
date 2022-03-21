import Loading from '@/components/atoms/Loading';
import { Infringement, useGetInfringementsQuery } from '@/generated/graphql';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import InfringementListItem from './InfringementListItem';

type InfringementListProps = {
  changeCurrentInfringement: (infringement: Infringement) => void;
  changeAddInfringementModalState: (newState: boolean) => void;
  changeDeleteInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementModalState: (newState: boolean) => void;
  changeUpdateInfringementStatusModalState: (newState: boolean) => void;
};

function InfringementList({
  changeCurrentInfringement,
  changeAddInfringementModalState,
  changeDeleteInfringementModalState,
  changeUpdateInfringementModalState,
  changeUpdateInfringementStatusModalState,
}: InfringementListProps) {
  const { data, loading, error } = useGetInfringementsQuery({
    variables: {
      first: 10,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div />;
  }

  const { infringements } = data;

  return infringements?.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {infringements?.edges.map((infringement) => (
          <InfringementListItem
            key={infringement.node.id}
            infringement={infringement.node as Infringement}
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
    <NoListItemButton
      onClick={() => changeAddInfringementModalState(true)}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      text="Add a new infringement"
    />
  );
}

export default InfringementList;
