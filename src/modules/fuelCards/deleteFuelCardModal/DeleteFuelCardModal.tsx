import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import {
  UpdateFuelCardInput,
  useDeleteFuelCardMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';

import CancelButton from '@/components/atoms/Button/CancelButton';
import DangerButton from '@/components/atoms/Button/DangerButton';

type DeleteFuelCardModalProps = {
  currentFuelCard: UpdateFuelCardInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

function DeleteFuelCardModal({
  currentFuelCard,
  modalState,
  changeModalState,
}: DeleteFuelCardModalProps) {
  const [deleteFuelCard] = useDeleteFuelCardMutation();

  const deleteCardHandler = async (id: string) => {
    changeModalState(false);
    try {
      await deleteFuelCard({
        variables: {
          data: {
            id,
          },
        },
      });
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
              Delete Fuel Card: {currentFuelCard.cardNumber}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this card? This will remove the
                fuel card from the list and disconnect the card from its
                connected vehicle.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DangerButton
            onClick={() => deleteCardHandler(currentFuelCard.id)}
            text="Delete"
          />
          <CancelButton
            onClick={() => changeModalState(false)}
            ref={cancelButtonRef}
          />
        </div>
      </div>
    </Modal>
  );
}

export default DeleteFuelCardModal;
