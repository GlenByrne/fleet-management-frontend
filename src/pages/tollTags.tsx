import { NextPage } from 'next';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from 'components/TollTags/Modal/Delete/DeleteTollTagModal';
import { addTollTagModalStateVar } from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetTollTagsQuery } from 'generated/graphql';
import CreateTollTagAlert from 'components/TollTags/Alerts/CreateTollTagAlert';
import UpdateTollTagAlert from 'components/TollTags/Alerts/UpdateTollTagAlert';
import DeleteTollTagAlert from 'components/TollTags/Alerts/DeleteTollTagAlert';

const TollTags: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetTollTagsQuery();

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
      },
    });
  };

  return (
    <Layout
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
      <CreateTollTagAlert />
      <UpdateTollTagAlert />
      <DeleteTollTagAlert />
      <TollTagList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default TollTags;
