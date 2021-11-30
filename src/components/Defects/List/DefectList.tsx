import Loading from 'core/Loading';
import { Defect, useGetVehicleDefectsQuery } from 'generated/graphql';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefectListItem from './DefectListItem';
import {
  addDefectModalStateVar,
  currentDefectVar,
} from 'constants/apollo-client';
import NoDefectAddButton from './NoDefectAddButton';
import { DefectUpdateModalItem } from 'constants/types';

const DefectList = () => {
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

  const changeCurrentDefect = (defect: Defect) => {
    const chosenDefect: DefectUpdateModalItem = {
      id: defect.id,
      description: defect.description,
      dateReported: defect.dateReported,
      reporter: defect.dateReported,
      dateCompleted: defect.dateCompleted,
      status: defect.status,
    };
    currentDefectVar(chosenDefect);
  };

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
          />
        ))}
      </ul>
    </div>
  ) : (
    <NoDefectAddButton onClick={addDefectModalStateVar} />
  );
};

export default DefectList;
