import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addUserModalStateVar } from 'constants/apollo-client';
import UserList from 'components/Users/List/UserList';
import CreateUserModal from 'components/Users/Modals/Create/CreateUserModal';
import DeleteUserModal from 'components/Users/Modals/Delete/DeleteUserModal';
import UpdateUserModal from 'components/Users/Modals/Update/UpdateUserModal';
import { FormEventHandler, useState, FormEvent } from 'react';
import { useGetUsersQuery } from 'generated/graphql';

const Users: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetUsersQuery();

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
      quickAction={addUserModalStateVar}
      quickActionLabel="New User"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateUserModal />
      <UpdateUserModal />
      <DeleteUserModal />
      <UserList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default Users;
