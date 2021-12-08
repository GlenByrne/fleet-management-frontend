import { NextPage } from 'next';
import { FormEventHandler, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useGetUsersInOrganisationQuery } from '@/generated/graphql';
import MainLayout from '@/core/Layout/MainLayout/MainLayout';
import { inviteUserModalStateVar } from '@/constants/apollo-client';
import CreateUserModal from '@/components/Users/Modals/Create/CreateUserModal';
import UpdateUserModal from '@/components/Users/Modals/Update/UpdateUserModal';
import RemoveUserModal from '@/components/Users/Modals/Remove/RemoveUserModal';
import UserList from '@/components/Users/List/UserList';

const Users: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetUsersInOrganisationQuery({
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
      quickAction={inviteUserModalStateVar}
      quickActionLabel="New User"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateUserModal />
      <UpdateUserModal />
      <RemoveUserModal />
      <UserList data={data} loading={loading} error={error} />
    </MainLayout>
  );
};

export default Users;
