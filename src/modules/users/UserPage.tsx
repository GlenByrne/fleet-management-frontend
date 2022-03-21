import React, { useState } from 'react';
import UserTemplate from 'src/templates/UserTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { UserUpdateModalItem } from '@/constants/types';
import CreateUserModal from '@/modules/users/addUserModal/CreateUserModal';
import RemoveUserModal from '@/modules/users/deleteUserModal/RemoveUserModal';
import UpdateUserModal from '@/modules/users/updateUserModal/UpdateUserModal';
import UserList from '@/modules/users/userList/UserList';
import { Role, UsersInOrganisationPayload } from '@/generated/graphql';

function UserPage() {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <UserTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={changeInviteUserModalState}
          quickActionLabel="Invite User"
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
          <CreateUserModal
            modalState={inviteUserModalState}
            changeModalState={changeInviteUserModalState}
          />
          <UpdateUserModal
            currentUser={currentUser}
            modalState={updateUserModalState}
            changeModalState={changeUpdateUserModalState}
          />
          <RemoveUserModal
            searchCriteria={searchCriteria}
            currentUser={currentUser}
            modalState={removeUserModalState}
            changeModalState={changeRemoveUserModalState}
          />
          <UserList
            changeInviteUserModalState={changeInviteUserModalState}
            changeRemoveUserModalState={changeRemoveUserModalState}
            changeUpdateUserModalState={changeUpdateUserModalState}
            changeCurrentUser={changeCurrentUser}
          />
        </>
      }
    />
  );
}

export default UserPage;
