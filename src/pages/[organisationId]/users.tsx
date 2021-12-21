import { NextPage } from 'next';
import { FormEventHandler, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Role,
  useGetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import { UserUpdateModalItem } from '@/constants/types';
import UsersPage from '@/components/pages/users';

const Users: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [inviteUserModalState, setInviteUserModalState] = useState(false);
  const [updateUserModalState, setUpdateUserModalState] = useState(false);
  const [removeUserModalState, setRemoveUserModalState] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserUpdateModalItem>({
    id: '',
    name: '',
    email: '',
    role: Role.User,
    depot: null,
  });

  const changeInviteUserModalState = (newState: boolean) => {
    setInviteUserModalState(newState);
  };

  const changeUpdateUserModalState = (newState: boolean) => {
    setUpdateUserModalState(newState);
  };

  const changeRemoveUserModalState = (newState: boolean) => {
    setRemoveUserModalState(newState);
  };

  const changeCurrentUser = (user: UsersInOrganisationPayload) => {
    const chosenUser: UserUpdateModalItem = {
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      role: user.role,
      depot: {
        id: user.depot != null ? user.depot.id : '',
        name: user.depot != null ? user.depot.name : '',
      },
    };
    setCurrentUser(chosenUser);
  };

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
    <UsersPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      searchCriteria={searchCriteria}
      changeSearchCriteria={changeSearchCriteria}
      searchSubmitHandler={searchSubmitHandler}
      quickAction={changeInviteUserModalState}
      quickActionLabel="New Tag"
      currentUser={currentUser}
      changeCurrentUser={changeCurrentUser}
      inviteUserModalState={inviteUserModalState}
      updateUserModalState={updateUserModalState}
      removeUserModalState={removeUserModalState}
      changeAddUserModalState={changeInviteUserModalState}
      changeUpdateUserModalState={changeUpdateUserModalState}
      changeRemoveUserModalState={changeRemoveUserModalState}
    />
    // <MainLayout
    //   hasQuickActionButton={true}
    //   quickAction={changeInviteUserModalState}
    //   quickActionLabel="New User"
    //   pageSearchable={true}
    //   searchSubmitHandler={submitHandler}
    //   setSearchCriteria={changeSearchCriteria}
    // >
    //   <CreateUserModal
    //     modalState={inviteUserModalState}
    //     changeModalState={changeInviteUserModalState}
    //   />
    //   <UpdateUserModal
    //     currentUser={currentUser}
    //     modalState={updateUserModalState}
    //     changeModalState={changeUpdateUserModalState}
    //   />
    //   <RemoveUserModal
    //     searchCriteria={searchCriteria}
    //     currentUser={currentUser}
    //     modalState={removeUserModalState}
    //     changeModalState={changeRemoveUserModalState}
    //   />
    //   <UserList
    //     data={data}
    //     loading={loading}
    //     error={error}
    //     changeInviteUserModalState={changeInviteUserModalState}
    //     changeRemoveUserModalState={changeRemoveUserModalState}
    //     changeUpdateUserModalState={changeUpdateUserModalState}
    //     changeCurrentUser={changeCurrentUser}
    //   />
    // </MainLayout>
  );
};

export default Users;
