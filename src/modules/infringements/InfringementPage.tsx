import HeaderWithQuickActionNoSearchBar from '@/components/organisms/HeaderWithQuickActionNoSearchBar';
import SideNav from '@/components/organisms/SideNav';
import {
  UpdateInfringementInput,
  InfringementStatus,
  Infringement,
} from '@/generated/graphql';
import React, { useState } from 'react';
import InfringementTemplate from 'src/templates/InfringementTemplate';
import CreateInfringementModal from './addInfringement/CreateInfringementModal';
import DeleteInfringementModal from './deleteInfringement/DeleteInfringementModal';
import InfringementList from './infringementList/InfringementList';
import UpdateInfringementModal from './updateInfringement/UpdateInfringementModal';
import UpdateInfringementStatusModal from './updateInfringementStatus/UpdateInfringementStatusModal';

const InfringementPage = () => {
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

  return (
    <InfringementTemplate
      header={
        <HeaderWithQuickActionNoSearchBar
          setMobileMenuOpen={changeMobileMenuOpenState}
          quickAction={changeAddInfringementModalState}
          quickActionLabel="New Infringement"
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
          <CreateInfringementModal
            modalState={addInfringementModalState}
            changeModalState={changeAddInfringementModalState}
          />
          <UpdateInfringementModal
            currentInfringement={currentInfringement}
            modalState={updateInfringementModalState}
            changeModalState={changeUpdateInfringementModalState}
          />
          <UpdateInfringementStatusModal
            currentInfringement={currentInfringement}
            modalState={updateInfringementStatusModalState}
            changeModalState={changeUpdateInfringementStatusModalState}
          />
          <DeleteInfringementModal
            currentInfringement={currentInfringement}
            modalState={deleteInfringementModalState}
            changeModalState={changeDeleteInfringementModalState}
          />
          <InfringementList
            changeAddInfringementModalState={changeAddInfringementModalState}
            changeDeleteInfringementModalState={
              changeDeleteInfringementModalState
            }
            changeUpdateInfringementModalState={
              changeUpdateInfringementModalState
            }
            changeUpdateInfringementStatusModalState={
              changeUpdateInfringementStatusModalState
            }
            changeCurrentInfringement={changeCurrentInfringement}
          />
        </>
      }
    />
  );
};

export default InfringementPage;
