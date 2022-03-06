import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import SideNav from '@/components/organisms/SideNav';
import { Defect, DefectStatus } from '@/generated/graphql';
import React, { useState } from 'react';
import DefectTemplate from 'src/templates/DefectTemplate';
import CreateDefectModal from './addDefect/CreateDefectModal';
import DefectList from './defectList/DefectList';
import DeleteDefectModal from './deleteDefect/DeleteDefectModal';
import UpdateDefectModal from './updateDefect/UpdateDefectModal';

const DefectPage = () => {
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

export default DefectPage;
