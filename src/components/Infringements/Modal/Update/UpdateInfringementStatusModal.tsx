import {
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import Modal from '@/components/Atomic/atoms/Modal';
import {
  UpdateInfringementInput,
  useUpdateInfringementStatusMutation,
} from '@/generated/graphql';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/solid';
import { useRef, FormEventHandler } from 'react';

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
  const [updateStatus] = useUpdateInfringementStatusMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateStatus({
        variables: {
          data: {
            id: currentInfringement.id,
          },
        },
      });
      successTextVar('Infringement status updated successfully');
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
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
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
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirm
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => changeModalState(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateInfringementStatusModal;
