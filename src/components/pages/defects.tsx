import SideNav from '@/components/organisms/SideNav';
import {
  Defect,
  DefectStatus,
  useGetVehicleDefectsQuery,
} from '@/generated/graphql';
import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import DefectTemplate from '@/components/templates/DefectTemplate';
import CreateDefectModal from '@/components/organisms/Defects/Modal/Create/CreateDefectModal';
import UpdateDefectModal from '@/components/organisms/Defects/Modal/Update/UpdateDefectModal';
import DeleteDefectModal from '@/components/organisms/Defects/Modal/Delete/DeleteDefectModal';
import DefectList from '@/components/organisms/Defects/List/DefectList';
import { useState } from 'react';
import { useRouter } from 'next/router';

const DefectsPage = () => {
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
    <DefectTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={changeMobileMenuOpenState}
          quickAction={changeAddDefectModalState}
          quickActionLabel="New Defect"
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      content={
        <>
          <CreateDefectModal
            modalState={addDefectModalState}
            changeModalState={changeAddDefectModalState}
          />
          <UpdateDefectModal
            currentDefect={currentDefect}
            modalState={updateDefectModalState}
            changeModalState={changeUpdateDefectModalState}
          />
          <DeleteDefectModal
            currentDefect={currentDefect}
            modalState={deleteDefectModalState}
            changeModalState={changeDeleteDefectModalState}
          />
          <DefectList
            data={data}
            loading={loading}
            error={error}
            changeAddDefectModalState={changeAddDefectModalState}
            changeDeleteDefectModalState={changeDeleteDefectModalState}
            changeUpdateDefectModalState={changeUpdateDefectModalState}
            changeCurrentDefect={changeCurrentDefect}
          />
        </>
      }
    />
  );
};

export default DefectsPage;
