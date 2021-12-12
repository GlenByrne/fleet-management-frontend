import DefectList from '@/components/Defects/List/DefectList';
import CreateDefectModal from '@/components/Defects/Modal/Create/CreateDefectModal';
import DeleteDefectModal from '@/components/Defects/Modal/Delete/DeleteDefectModal';
import UpdateDefectModal from '@/components/Defects/Modal/Update/UpdateDefectModal';
import MainLayout from '@/core/Layout/MainLayout/MainLayout';
import { Defect, DefectStatus } from '@/generated/graphql';
import { NextPage } from 'next';
import { useState } from 'react';

const Defects: NextPage = () => {
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

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={changeAddDefectModalState}
      quickActionLabel="New Defect"
      pageSearchable={false}
    >
      <DefectList
        changeAddDefectModalState={changeAddDefectModalState}
        changeDeleteDefectModalState={changeDeleteDefectModalState}
        changeUpdateDefectModalState={changeUpdateDefectModalState}
        changeCurrentDefect={changeCurrentDefect}
      />
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
    </MainLayout>
  );
};

export default Defects;
