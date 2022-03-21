import { useRouter } from 'next/router';
import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { Defect, useGetVehicleDefectsQuery } from '@/generated/graphql';
import DefectListItem from './DefectListItem';

type DefectListProps = {
  changeCurrentDefect: (defect: Defect) => void;
  changeAddDefectModalState: (newState: boolean) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
};

function DefectList({
  changeCurrentDefect,
  changeAddDefectModalState,
  changeDeleteDefectModalState,
  changeUpdateDefectModalState,
}: DefectListProps) {
  const router = useRouter();
  const vehicleId = String(router.query.vehicleId);
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetVehicleDefectsQuery({
    variables: {
      data: {
        organisationId,
        vehicleId,
      },
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    <div />;
  }

  const defects = data?.defectsForVehicle;

  return defects?.edges.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {defects?.edges.map((defect) => (
          <DefectListItem
            key={defect?.id}
            defect={defect.node as Defect}
            changeCurrentDefect={changeCurrentDefect}
            changeDeleteDefectModalState={changeDeleteDefectModalState}
            changeUpdateDefectModalState={changeUpdateDefectModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoListItemButton
      onClick={() => changeAddDefectModalState(true)}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      text="Add a new defect"
    />
  );
}

export default DefectList;
