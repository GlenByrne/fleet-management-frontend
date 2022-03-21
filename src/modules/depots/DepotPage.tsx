import React, { useState } from 'react';
import DepotTemplate from 'src/templates/DepotTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { UpdateDepotInput, Depot } from '@/generated/graphql';
import CreateDepotModal from './addDepot/CreateDepotModal';
import DeleteDepotModal from './deleteDepot/DeleteDepotModal';
import DepotList from './depotList/DepotList';
import UpdateDepotModal from './updateDepot/UpdateDepotModal';

function DepotPage() {
  const [addDepotModalState, setAddDepotModalState] = useState(false);
  const [updateDepotModalState, setUpdateDepotModalState] = useState(false);
  const [deleteDepotModalState, setDeleteDepotModalState] = useState(false);
  const [currentDepot, setCurrentDepot] = useState<UpdateDepotInput>({
    id: '',
    name: '',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeAddDepotModalState = (newState: boolean) => {
    setAddDepotModalState(newState);
  };

  const changeUpdateDepotModalState = (newState: boolean) => {
    setUpdateDepotModalState(newState);
  };

  const changeDeleteDepotModalState = (newState: boolean) => {
    setDeleteDepotModalState(newState);
  };

  const changeCurrentDepot = (depot: Depot) => {
    const chosenDepot: UpdateDepotInput = {
      id: depot.id,
      name: depot.name,
    };
    setCurrentDepot(chosenDepot);
  };

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <DepotTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={changeAddDepotModalState}
          quickActionLabel="New Depot"
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
          <CreateDepotModal
            modalState={addDepotModalState}
            changeModalState={changeAddDepotModalState}
          />
          <UpdateDepotModal
            currentDepot={currentDepot}
            modalState={updateDepotModalState}
            changeModalState={changeUpdateDepotModalState}
          />
          <DeleteDepotModal
            currentDepot={currentDepot}
            modalState={deleteDepotModalState}
            changeModalState={changeDeleteDepotModalState}
          />
          <DepotList
            changeAddDepotModalState={changeAddDepotModalState}
            changeDeleteDepotModalState={changeDeleteDepotModalState}
            changeUpdateDepotModalState={changeUpdateDepotModalState}
            changeCurrentDepot={changeCurrentDepot}
          />
        </>
      }
    />
  );
}

export default DepotPage;
