import Loading from '@/core/Loading';
import { Defect, useGetVehicleDefectsQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import DefectListItem from './DefectListItem';
import NoDefectAddButton from './NoDefectAddButton';

type DefectListProps = {
  changeCurrentDefect: (defect: Defect) => void;
  changeAddDefectModalState: (newState: boolean) => void;
  changeDeleteDefectModalState: (newState: boolean) => void;
  changeUpdateDefectModalState: (newState: boolean) => void;
};

const DefectList = ({
  changeCurrentDefect,
  changeAddDefectModalState,
  changeDeleteDefectModalState,
  changeUpdateDefectModalState,
}: DefectListProps) => {
  const router = useRouter();
  const vehicleId = String(router.query.vehicleId);

  // const [shouldSkip, setShouldSkip] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     setShouldSkip(false);
  //   }
  // }, [id]);

  const { data, loading, error } = useGetVehicleDefectsQuery({
    variables: {
      vehicleId,
    },
    // skip: shouldSkip,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    <div></div>;
  }

  const defects = data?.defectsForVehicle as Defect[];

  return defects.length > 0 ? (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {defects.map((defect) => (
          <DefectListItem
            key={defect.id}
            defect={defect}
            changeCurrentDefect={changeCurrentDefect}
            changeDeleteDefectModalState={changeDeleteDefectModalState}
            changeUpdateDefectModalState={changeUpdateDefectModalState}
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoDefectAddButton onClick={changeAddDefectModalState} />
  );
};

export default DefectList;
