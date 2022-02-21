import Modal from '@/components/atoms/Modal';
import {
  UpdateInfringementInput,
  useUpdateInfringementStatusMutation,
} from '@/generated/graphql';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/solid';
import { useRef, FormEventHandler } from 'react';
import SuccessButton from '@/components/atoms/Button/SuccessButton';
import CancelButton from '@/components/atoms/Button/CancelButton';

type UpdateInfringementStatusModalProps = {
  currentInfringement: UpdateInfringementInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const UpdateInfringementStatusModal = ({
  currentInfringement,
  modalState,
  changeModalState,
}: UpdateInfringementStatusModalProps) => {
  const [updateStatusResult, updateStatus] =
    useUpdateInfringementStatusMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    const result = {
      data: {
        id: currentInfringement.id,
      },
    };
    try {
      await updateStatus(result);
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
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Update Status
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Would you like to mark this infringement as signed?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <SuccessButton text="Confirm" type="submit" />
            <CancelButton
              onClick={() => changeModalState(false)}
              ref={cancelButtonRef}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateInfringementStatusModal;
