import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import TollTagList from '@/components/organisms/TollTags/List/TollTagList';
import CreateTollTagModal from '@/components/organisms/TollTags/Modal/Create/CreateTollTagModal';
import DeleteTollTagModal from '@/components/organisms/TollTags/Modal/Delete/DeleteTollTagModal';
import UpdateTollTagModal from '@/components/organisms/TollTags/Modal/Update/UpdateTollTagModal';
import TollTagTemplate from '@/components/templates/TollTagTemplate';
import {
  TollTag,
  GetTollTagsQuery,
  UpdateTollTagInput,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';

type TollTagsProps = {
  data: GetTollTagsQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  searchCriteria: string | null;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentTollTag: UpdateTollTagInput;
  changeCurrentTollTag: (tollTag: TollTag) => void;
  addTollTagModalState: boolean;
  updateTollTagModalState: boolean;
  deleteTollTagModalState: boolean;
  changeAddTollTagModalState: (newState: boolean) => void;
  changeUpdateTollTagModalState: (newState: boolean) => void;
  changeDeleteTollTagModalState: (newState: boolean) => void;
};

const TollTagsPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchCriteria,
  changeSearchCriteria,
  searchSubmitHandler,
  quickAction,
  quickActionLabel,
  currentTollTag,
  changeCurrentTollTag,
  addTollTagModalState,
  updateTollTagModalState,
  deleteTollTagModalState,
  changeAddTollTagModalState,
  changeUpdateTollTagModalState,
  changeDeleteTollTagModalState,
}: TollTagsProps) => {
  return (
    <TollTagTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={setMobileMenuOpen}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
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
            data={data}
            loading={loading}
            error={error}
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

export default TollTagsPage;
