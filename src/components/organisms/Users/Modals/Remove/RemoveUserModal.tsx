import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import {
  GetUsersInOrganisationDocument,
  GetUsersInOrganisationQuery,
  useRemoveUserFromOrganisationMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import { UserUpdateModalItem } from '@/constants/types';
import CancelButton from '@/components/atoms/CancelButton';
import DangerButton from '@/components/atoms/DangerButton';

type RemoveUserModalProps = {
  searchCriteria: string | null;
  currentUser: UserUpdateModalItem;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const RemoveUserModal = ({
  searchCriteria,
  currentUser,
  modalState,
  changeModalState,
}: RemoveUserModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [removeUser] = useRemoveUserFromOrganisationMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentUsers = cache.readQuery<GetUsersInOrganisationQuery>({
        query: GetUsersInOrganisationDocument,
      });

      const newUsers = currentUsers?.usersInOrganisation?.filter((user) =>
        user != null
          ? user.user.id !== mutationReturn?.removeUserFromOrganisation.user.id
          : currentUsers.usersInOrganisation
      );

      cache.writeQuery({
        query: GetUsersInOrganisationDocument,
        data: { usersInOrganisation: newUsers },
      });

      cache.evict({
        id: mutationReturn?.removeUserFromOrganisation.user.id,
      });
    },
  });

  const removeUserHandler = async (userId: string) => {
    changeModalState(false);
    try {
      await removeUser({
        variables: {
          data: {
            userId,
            organisationId,
          },
        },
      });

      successTextVar('User removed from organisation successfully');
      successAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Remove User: {currentUser.name}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove this user organisation? The user
                will no longer be able to access this organisation.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DangerButton
            onClick={() => removeUserHandler(currentUser.id)}
            text="Remove"
          />
          <CancelButton
            onClick={() => changeModalState(false)}
            ref={cancelButtonRef}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemoveUserModal;