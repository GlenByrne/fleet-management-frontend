import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
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

  const [removeUserResult, removeUser] =
    useRemoveUserFromOrganisationMutation();

  const removeUserHandler = async (userId: string) => {
    changeModalState(false);
    try {
      const variables = {
        data: {
          userId,
          organisationId,
        },
      };
      await removeUser(variables);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
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
