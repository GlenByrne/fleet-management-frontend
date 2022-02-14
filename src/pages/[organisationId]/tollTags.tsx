import { NextPage } from 'next';
import TollTagTemplate from '@/components/templates/TollTagTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import CreateTollTagModal from '@/components/organisms/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from '@/components/organisms/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from '@/components/organisms/TollTags/Modal/Delete/DeleteTollTagModal';
import TollTagList from '@/components/organisms/TollTags/List/TollTagList';
import { FormEvent, FormEventHandler, useState } from 'react';
import {
  TollTag,
  UpdateTollTagInput,
  useGetTollTagsQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';

const TollTags: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [addTollTagModalState, setAddTollTagModalState] = useState(false);
  const [updateTollTagModalState, setUpdateTollTagModalState] = useState(false);
  const [deleteTollTagModalState, setDeleteTollTagModalState] = useState(false);

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

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetTollTagsQuery({
    variables: {
      first: 10,
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
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

export default TollTags;
