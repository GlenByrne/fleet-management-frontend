import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { UpdateTollTagInput, TollTag } from '@/generated/graphql';
import React, { useState } from 'react';
import TollTagTemplate from 'src/templates/TollTagTemplate';
import CreateTollTagModal from './addTollTag/CreateTollTagModal';
import DeleteTollTagModal from './deleteTollTag/DeleteTollTagModal';
import TollTagList from './tollTagList/TollTagList';
import UpdateTollTagModal from './updateTollTag/UpdateTollTagModal';

const TollTagPage = () => {
  const [addTollTagModalState, setAddTollTagModalState] = useState(false);
  const [updateTollTagModalState, setUpdateTollTagModalState] = useState(false);
  const [deleteTollTagModalState, setDeleteTollTagModalState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTollTag, setCurrentTollTag] = useState<UpdateTollTagInput>({
    id: '',
    tagNumber: '',
    tagProvider: '',
  });

  const changeAddTollTagModalState = (newState: boolean) => {
    setAddTollTagModalState(newState);
  };

  const changeUpdateTollTagModalState = (newState: boolean) => {
    setUpdateTollTagModalState(newState);
  };

  const changeDeleteTollTagModalState = (newState: boolean) => {
    setDeleteTollTagModalState(newState);
  };

  const changeCurrentTollTag = (tollTag: TollTag) => {
    const chosenTollTag: UpdateTollTagInput = {
      id: tollTag.id,
      tagNumber: tollTag.tagNumber,
      tagProvider: tollTag.tagProvider,
    };
    setCurrentTollTag(chosenTollTag);
  };

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <TollTagTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={changeAddTollTagModalState}
          quickActionLabel="New Tag"
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
          <CreateTollTagModal
            modalState={addTollTagModalState}
            changeModalState={changeAddTollTagModalState}
          />
          <UpdateTollTagModal
            currentTollTag={currentTollTag}
            modalState={updateTollTagModalState}
            changeModalState={changeUpdateTollTagModalState}
          />
          <DeleteTollTagModal
            searchCriteria={searchCriteria}
            currentTollTag={currentTollTag}
            modalState={deleteTollTagModalState}
            changeModalState={changeDeleteTollTagModalState}
          />
          <TollTagList
            changeAddTollTagModalState={changeAddTollTagModalState}
            changeDeleteTollTagModalState={changeDeleteTollTagModalState}
            changeUpdateTollTagModalState={changeUpdateTollTagModalState}
            changeCurrentTollTag={changeCurrentTollTag}
          />
        </>
      }
    />
  );
};

export default TollTagPage;
