import { useReactiveVar } from '@apollo/client';
import { TruckIcon } from '@heroicons/react/solid';
import {
  currentDepotVar,
  errorAlertStateVar,
  successAlertStateVar,
  successTextVar,
  updateDepotModalStateVar,
} from 'constants/apollo-client';
import { Dialog } from '@headlessui/react';
import Modal from 'core/Modal/Modal';
import ModalFormInput from 'core/Modal/ModalFormInput';
import {
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useUpdateDepotMutation,
} from 'generated/graphql';
import {
  FormEvent,
  useEffect,
  useState,
  useRef,
  FormEventHandler,
} from 'react';

const UpdateDepotModal = () => {
  const currentDepot = useReactiveVar(currentDepotVar);

  const currentModalStateVar = useReactiveVar(updateDepotModalStateVar);

  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentDepot.name);
  }, [currentDepot]);

  const changeName = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateDepot] = useUpdateDepotMutation({
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    updateDepotModalStateVar(false);
    try {
      await updateDepot({
        variables: {
          data: {
            id: currentDepot.id,
            name: name != null ? name : '',
          },
        },
      });

      successTextVar('Depot updated successfully');
      successAlertStateVar(true);
    } catch {
      errorAlertStateVar(true);
      throw new Error('Error updating depot');
    }
  };

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={updateDepotModalStateVar}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Update Fuel Card
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={changeName}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => updateDepotModalStateVar(false)}
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

export default UpdateDepotModal;
