import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { UpdateDepotInput, useDeleteDepotMutation } from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import CancelButton from '@/components/atoms/Button/CancelButton';
import DangerButton from '@/components/atoms/Button/DangerButton';

type DeleteDepotModalProps = {
  currentDepot: UpdateDepotInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const DeleteDepotModal = ({
  currentDepot,
  modalState,
  changeModalState,
}: DeleteDepotModalProps) => {
  const [deleteDepot] = useDeleteDepotMutation();

  const deleteDepotHandler = async (id: string) => {
    changeModalState(false);
    try {
      await deleteDepot({
        variables: {
          data: {
            id: id,
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
              Delete Depot: {currentDepot.name}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this depot? This will remove the
                depot from the list and disconnect any vehicles, card, and tags
                that are connected to it.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DangerButton
            onClick={() => deleteDepotHandler(currentDepot.id)}
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
};

export default DeleteDepotModal;
