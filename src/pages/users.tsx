import { NextPage } from 'next';
import Layout from 'core/Layout/Layout';
import { addUserModalStateVar } from 'constants/apollo-client';
import UserList from 'components/Users/List/UserList';
import CreateUserModal from 'components/Users/Modals/Create/CreateUserModal';
import DeleteUserModal from 'components/Users/Modals/Delete/DeleteUserModal';
import UpdateUserModal from 'components/Users/Modals/Update/UpdateUserModal';

const Users: NextPage = () => {
  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addUserModalStateVar}
      quickActionLabel="New User"
    >
      <CreateUserModal />
      <UpdateUserModal />
      <DeleteUserModal />
      <UserList />
    </Layout>
  );
};

export default Users;
