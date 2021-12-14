import HeaderWithSearchBarAndQuickActionButton from '@/components/Atomic/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/Atomic/organisms/SideNav';
import {
  GetUsersInOrganisationQuery,
  UsersInOrganisationPayload,
} from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';
import { UserUpdateModalItem } from '@/constants/types';
import UserTemplate from '@/components/Atomic/templates/UserTemplate';
import CreateUserModal from '@/components/Atomic/organisms/Users/Modals/Create/CreateUserModal';
import UpdateUserModal from '@/components/Atomic/organisms/Users/Modals/Update/UpdateUserModal';
import RemoveUserModal from '@/components/Atomic/organisms/Users/Modals/Remove/RemoveUserModal';
import UserList from '@/components/Atomic/organisms/Users/List/UserList';

type UsersProps = {
  data: GetUsersInOrganisationQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  searchCriteria: string | null;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentUser: UserUpdateModalItem;
  changeCurrentUser: (user: UsersInOrganisationPayload) => void;
  inviteUserModalState: boolean;
  updateUserModalState: boolean;
  removeUserModalState: boolean;
  changeAddUserModalState: (newState: boolean) => void;
  changeUpdateUserModalState: (newState: boolean) => void;
  changeRemoveUserModalState: (newState: boolean) => void;
};

const UsersPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchCriteria,
  changeSearchCriteria,
  searchSubmitHandler,
  quickAction,
  quickActionLabel,
  currentUser,
  changeCurrentUser,
  inviteUserModalState,
  updateUserModalState,
  removeUserModalState,
  changeAddUserModalState,
  changeUpdateUserModalState,
  changeRemoveUserModalState,
}: UsersProps) => {
  return (
    <UserTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={setMobileMenuOpen}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      }
      content={
        <>
          <CreateUserModal
            modalState={inviteUserModalState}
            changeModalState={changeAddUserModalState}
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
            data={data}
            loading={loading}
            error={error}
            changeInviteUserModalState={changeAddUserModalState}
            changeRemoveUserModalState={changeRemoveUserModalState}
            changeUpdateUserModalState={changeUpdateUserModalState}
            changeCurrentUser={changeCurrentUser}
          />
        </>
      }
    />
  );
};

export default UsersPage;
