import { NextPage } from 'next';
import TollTagList from 'components/TollTags/List/TollTagList';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from 'components/TollTags/Modal/Delete/DeleteTollTagModal';
import {
  addTollTagModalStateVar,
  currentOrganisationVar,
} from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetTollTagsQuery } from 'generated/graphql';
import MainLayout from 'core/Layout/MainLayout/MainLayout';

const TollTags: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetTollTagsQuery({
    variables: {
      data: {
        organisationId: currentOrganisationVar(),
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
        organisationId: currentOrganisationVar(),
      },
    });
  };

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={addTollTagModalStateVar}
      quickActionLabel="New Tag"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateTollTagModal />
      <UpdateTollTagModal />
      <DeleteTollTagModal />
      <TollTagList data={data} loading={loading} error={error} />
    </MainLayout>
  );
};

export default TollTags;
