import InfringementsPage from '@/components/Atomic/pages/infringements';
import {
  Infringement,
  InfringementStatus,
  UpdateInfringementInput,
  useGetInfringementsQuery,
} from '@/generated/graphql';
import { NextPage } from 'next';
import { useState } from 'react';

const Infringements: NextPage = () => {
  const { data, loading, error } = useGetInfringementsQuery();

  const [addInfringementModalState, setAddInfringementModalState] =
    useState(false);
  const [updateInfringementModalState, setUpdateInfringementModalState] =
    useState(false);
  const [
    updateInfringementStatusModalState,
    setUpdateInfringementStatusModalState,
  ] = useState(false);
  const [deleteInfringementModalState, setDeleteInfringementModalState] =
    useState(false);

  const [currentInfringement, setCurrentInfringement] =
    useState<UpdateInfringementInput>({
      id: '',
      description: '',
      dateOccured: new Date(),
      status: InfringementStatus.Unsigned,
    });

  const changeAddInfringementModalState = (newState: boolean) => {
    setAddInfringementModalState(newState);
  };

  const changeUpdateInfringementModalState = (newState: boolean) => {
    setUpdateInfringementModalState(newState);
  };

  const changeUpdateInfringementStatusModalState = (newState: boolean) => {
    setUpdateInfringementStatusModalState(newState);
  };

  const changeDeleteInfringementModalState = (newState: boolean) => {
    setDeleteInfringementModalState(newState);
  };

  const changeCurrentInfringement = (infringement: Infringement) => {
    const chosenInfringement: UpdateInfringementInput = {
      id: infringement.id,
      description: infringement.description,
      dateOccured: infringement.dateOccured,
      status: infringement.status,
    };
    setCurrentInfringement(chosenInfringement);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <InfringementsPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      quickAction={changeAddInfringementModalState}
      quickActionLabel="New Card"
      currentInfringement={currentInfringement}
      changeCurrentInfringement={changeCurrentInfringement}
      addInfringementModalState={addInfringementModalState}
      updateInfringementModalState={updateInfringementModalState}
      updateInfringementStatusModalState={updateInfringementStatusModalState}
      deleteInfringementModalState={deleteInfringementModalState}
      changeAddInfringementModalState={changeAddInfringementModalState}
      changeUpdateInfringementModalState={changeUpdateInfringementModalState}
      changeUpdateInfringementStatusModalState={
        changeUpdateInfringementStatusModalState
      }
      changeDeleteInfringementModalState={changeDeleteInfringementModalState}
    />
    // <MainLayout
    //   hasQuickActionButton={true}
    //   quickAction={changeAddInfringementModalState}
    //   quickActionLabel="New Infringement"
    //   pageSearchable={false}
    // >
    //   <CreateInfringementModal
    //     modalState={addInfringementModalState}
    //     changeModalState={changeAddInfringementModalState}
    //   />
    //   <UpdateInfringementModal
    //     currentInfringement={currentInfringement}
    //     modalState={updateInfringementModalState}
    //     changeModalState={changeUpdateInfringementModalState}
    //   />
    //   <UpdateInfringementStatusModal
    //     currentInfringement={currentInfringement}
    //     modalState={updateInfringementModalState}
    //     changeModalState={changeUpdateInfringementModalState}
    //   />
    //   <DeleteInfringementModal
    //     currentInfringement={currentInfringement}
    //     modalState={deleteInfringementModalState}
    //     changeModalState={changeDeleteInfringementModalState}
    //   />
    //   <InfringementList
    //     changeAddInfringementModalState={changeAddInfringementModalState}
    //     changeDeleteInfringementModalState={changeDeleteInfringementModalState}
    //     changeUpdateInfringementModalState={changeUpdateInfringementModalState}
    //     changeUpdateInfringementStatusModalState={
    //       changeUpdateInfringementStatusModalState
    //     }
    //     changeCurrentInfringement={changeCurrentInfringement}
    //   />
    // </MainLayout>
  );
};

export default Infringements;
