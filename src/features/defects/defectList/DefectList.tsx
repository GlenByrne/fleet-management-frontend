import Loading from '@/components/atoms/Loading';
import NoListItemButton from '@/components/atoms/NoListItemButton';
import { Defect, GetVehicleDefectsQuery } from '@/generated/graphql';
import { UseQueryState } from 'urql';
import DefectListItem from './DefectListItem';

type DefectListProps = {
  defectList: UseQueryState<GetVehicleDefectsQuery, object>;
  changeCurrentDefect: (defect: Defect) => void;
  changeAddDefectModalState: (newState: boolean) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
};

const DefectList = ({
  defectList,
  changeCurrentDefect,
  changeAddDefectModalState,
  changeDeleteDefectModalState,
  changeUpdateDefectModalState,
}: DefectListProps) => {
  const { data, fetching, error } = defectList;

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    <div></div>;
  }

  const defects = data?.defectsForVehicles;

  return defects.length > 0 ? (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {defects.map((defect) => (
          <DefectListItem
            key={defect?.id}
            defect={defect as Defect}
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
};

export default DefectList;
