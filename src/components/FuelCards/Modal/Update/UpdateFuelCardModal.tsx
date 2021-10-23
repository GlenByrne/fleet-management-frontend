import { FormEventHandler, useRef } from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  Depot,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useGetSelectableItemsForUpdateFuelCardQuery,
  useUpdateFuelCardMutation,
} from 'generated/graphql';
import { FuelCardUpdateModalItem, Option } from 'constants/types';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';

type UpdateFuelCardModalProps = {
  modalState: boolean;
  modalStateHandler: (status: boolean) => void;
  fuelCard: FuelCardUpdateModalItem;
};

const getDepotOptions = (depots: Depot[]) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const UpdateFuelCardModal = ({
  modalState,
  modalStateHandler,
  fuelCard,
}: UpdateFuelCardModalProps) => {
  const cardNumberInputRef = useRef<HTMLInputElement>(null);
  const cardProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  const cancelButtonRef = useRef(null);

  const [updateFuelCard] = useUpdateFuelCardMutation({
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    modalStateHandler(false);
    updateFuelCard({
      variables: {
        updateFuelCardData: {
          id: fuelCard.id,
          cardNumber:
            cardNumberInputRef.current?.value != null
              ? cardNumberInputRef.current.value
              : '',
          cardProvider:
            cardProviderInputRef.current?.value != null
              ? cardProviderInputRef.current.value
              : '',
          depotId:
            depotIdInputRef.current?.value != null
              ? depotIdInputRef.current.value
              : '',
        },
      },
    });
  };

  const { data, loading, error } =
    useGetSelectableItemsForUpdateFuelCardQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Modal
      modalState={modalState}
      cancelButtonRef={cancelButtonRef}
      setModalState={modalStateHandler}
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
                Update Toll Tag
              </Dialog.Title>
              <div className="mt-2">
                <ModalFormInput
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  ref={cardNumberInputRef}
                  required={true}
                  defaultValue={fuelCard.cardNumber}
                />

                <ModalFormInput
                  label="Card Provider"
                  name="cardProvider"
                  type="text"
                  ref={cardProviderInputRef}
                  required={true}
                  defaultValue={fuelCard.cardProvider}
                />

                <ModalFormSelect
                  label="Depot"
                  name="depot"
                  ref={depotIdInputRef}
                  required={true}
                  options={getDepotOptions(data.depots as Depot[])}
                  defaultValue={fuelCard.depot.id}
                />
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
              onClick={() => modalStateHandler(false)}
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

export default UpdateFuelCardModal;
