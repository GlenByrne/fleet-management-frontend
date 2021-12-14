import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TollTag,
  UpdateTollTagInput,
  useGetTollTagsQuery,
} from '@/generated/graphql';
import MainLayout from '@/components/Atomic/templates/FuelCardTemplate';
import CreateTollTagModal from '@/components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from '@/components/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from '@/components/TollTags/Modal/Delete/DeleteTollTagModal';
import TollTagList from '@/components/TollTags/List/TollTagList';

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
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={changeAddTollTagModalState}
      quickActionLabel="New Tag"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
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
    </MainLayout>
  );
};

export default TollTags;
