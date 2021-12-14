import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TollTag,
  UpdateTollTagInput,
  useGetTollTagsQuery,
} from '@/generated/graphql';
import TollTagsPage from '@/components/Atomic/pages/tollTags';

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
    <TollTagsPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      searchCriteria={searchCriteria}
      changeSearchCriteria={changeSearchCriteria}
      searchSubmitHandler={searchSubmitHandler}
      quickAction={changeAddTollTagModalState}
      quickActionLabel="New Tag"
      currentTollTag={currentTollTag}
      changeCurrentTollTag={changeCurrentTollTag}
      addTollTagModalState={addTollTagModalState}
      updateTollTagModalState={updateTollTagModalState}
      deleteTollTagModalState={deleteTollTagModalState}
      changeAddTollTagModalState={changeAddTollTagModalState}
      changeUpdateTollTagModalState={changeUpdateTollTagModalState}
      changeDeleteTollTagModalState={changeDeleteTollTagModalState}
    />
  );
};

export default TollTags;
