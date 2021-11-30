import { NextPage } from 'next';
import {
  addUserModalStateVar,
  currentOrganisationVar,
} from 'constants/apollo-client';
import UserList from 'components/Users/List/UserList';
import CreateUserModal from 'components/Users/Modals/Create/CreateUserModal';
import UpdateUserModal from 'components/Users/Modals/Update/UpdateUserModal';
import { FormEventHandler, useState, FormEvent } from 'react';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import { useGetUsersInOrganisationQuery } from 'generated/graphql';
import RemoveUserModal from 'components/Users/Modals/Remove/RemoveUserModal';
import Loading from 'core/Loading';
import useAuthentication from 'hooks/useAuthentication';

const Users: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetUsersInOrganisationQuery({
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

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  return (
    <MainLayout
      hasQuickActionButton={true}
      quickAction={addUserModalStateVar}
      quickActionLabel="New User"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateUserModal />
      <UpdateUserModal />
      <RemoveUserModal />
      <UserList
      // data={data} loading={loading} error={error}
      />
    </MainLayout>
  );
};

export default Users;
