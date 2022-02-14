import { NextPage } from 'next';
import UserTemplate from '@/components/templates/UserTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import CreateUserModal from '@/components/organisms/Users/Modals/Create/CreateUserModal';
import UpdateUserModal from '@/components/organisms/Users/Modals/Update/UpdateUserModal';
import RemoveUserModal from '@/components/organisms/Users/Modals/Remove/RemoveUserModal';
import UserList from '@/components/organisms/Users/List/UserList';
import { FormEvent, FormEventHandler, useState } from 'react';
import {
  Role,
  useGetDepotsQuery,
  useGetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import { UserUpdateModalItem } from '@/constants/types';
import { useRouter } from 'next/router';

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
  const users = useGetUsersInOrganisationQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const depots = useGetDepotsQuery({
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
    users.refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const endCursor = users.data?.usersInOrganisation.pageInfo.endCursor;

  // const fetchMoreUsers = () => {
  //   users.fetchMore({
  //     variables: {
  //       after: endCursor,
  //     },
  //   });
  // };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

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
          <UserList
            data={users.data}
            loading={users.loading}
            error={users.error}
            // fetchMore={}
            changeInviteUserModalState={changeInviteUserModalState}
            changeRemoveUserModalState={changeRemoveUserModalState}
            changeUpdateUserModalState={changeUpdateUserModalState}
            changeCurrentUser={changeCurrentUser}
          />
        </>
      }
    />
  );
};

export default Users;
