import DefectList from '@/components/organisms/Defects/List/DefectList';
import CreateDefectModal from '@/components/organisms/Defects/Modal/Create/CreateDefectModal';
import DeleteDefectModal from '@/components/organisms/Defects/Modal/Delete/DeleteDefectModal';
import UpdateDefectModal from '@/components/organisms/Defects/Modal/Update/UpdateDefectModal';
import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import SideNav from '@/components/organisms/SideNav';
import DefectTemplate from 'src/templates/DefectTemplate';
import {
  useGetVehicleDefectsQuery,
  Defect,
  DefectStatus,
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

  const [defects] = useGetVehicleDefectsQuery({
    variables: {
      data: {
        vehicleId,
      },
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
            data={defects.data}
            loading={defects.fetching}
            error={defects.error}
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

export default Defects;
