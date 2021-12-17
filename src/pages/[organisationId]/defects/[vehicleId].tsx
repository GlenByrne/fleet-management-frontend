import DefectsPage from '@/components/pages/defects';
import {
  Defect,
  DefectStatus,
  useGetVehicleDefectsQuery,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Defects: NextPage = () => {
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

  const [addDefectModalState, setAddDefectModalState] = useState(false);
  const [updateDefectModalState, setUpdateDefectModalState] = useState(false);
  const [deleteDefectModalState, setDeleteDefectModalState] = useState(false);

  const [currentDefect, setCurrentDefect] = useState<Defect>({
    id: '',
    description: '',
    dateReported: new Date(),
    reporter: '',
    dateCompleted: null,
    status: DefectStatus.Incomplete,
  });

  const changeAddDefectModalState = (newState: boolean) => {
    setAddDefectModalState(newState);
  };

  const changeUpdateDefectModalState = (newState: boolean) => {
    setUpdateDefectModalState(newState);
  };

  const changeDeleteDefectModalState = (newState: boolean) => {
    setDeleteDefectModalState(newState);
  };

  const changeCurrentDefect = (defect: Defect) => {
    const chosenDefect: Defect = {
      id: defect.id,
      description: defect.description,
      dateReported: defect.dateReported,
      reporter: defect.dateReported,
      dateCompleted: defect.dateCompleted,
      status: defect.status,
    };
    setCurrentDefect(chosenDefect);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <DefectsPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      quickAction={changeAddDefectModalState}
      quickActionLabel="New Defect"
      currentDefect={currentDefect}
      changeCurrentDefect={changeCurrentDefect}
      addDefectModalState={addDefectModalState}
      updateDefectModalState={updateDefectModalState}
      deleteDefectModalState={deleteDefectModalState}
      changeAddDefectModalState={changeAddDefectModalState}
      changeUpdateDefectModalState={changeUpdateDefectModalState}
      changeDeleteDefectModalState={changeDeleteDefectModalState}
    />
  );
};

export default Defects;
