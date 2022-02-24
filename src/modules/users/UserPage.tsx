import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { UserUpdateModalItem } from '@/constants/types';
import CreateUserModal from '@/modules/users/addUserModal/CreateUserModal';
import RemoveUserModal from '@/modules/users/deleteUserModal/RemoveUserModal';
import UpdateUserModal from '@/modules/users/updateUserModal/UpdateUserModal';
import UserList from '@/modules/users/userList/UserList';
import {
  Role,
  UsersInOrganisationPayload,
  useGetUsersInOrganisationQuery,
  useGetDepotsQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import UserTemplate from 'src/templates/UserTemplate';

const UserPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [pageVariables, setPageVariables] = useState([
    {
      first: 5,
      after: '',
    },
  ]);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);

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

  const [users, refetchUsers] = useGetUsersInOrganisationQuery({
    variables: {
      ...pageVariables,
      data: {
        organisationId,
      },
    },
  });

  const [depots, refetchDepots] = useGetDepotsQuery({
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
    refetchUsers({
      ...pageVariables,
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
            depots={depots}
            modalState={inviteUserModalState}
            changeModalState={changeInviteUserModalState}
          />
          <UpdateUserModal
            depots={depots}
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
          {pageVariables.map((variables, i) => (
            <UserList
              key={'' + variables.after}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              onLoadMore={(after: string) =>
                setPageVariables([...pageVariables, { after, first: 10 }])
              }
              usersList={users}
              changeInviteUserModalState={changeInviteUserModalState}
              changeRemoveUserModalState={changeRemoveUserModalState}
              changeUpdateUserModalState={changeUpdateUserModalState}
              changeCurrentUser={changeCurrentUser}
            />
          ))}
        </>
      }
    />
  );
};

export default UserPage;
