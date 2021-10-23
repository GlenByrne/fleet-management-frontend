import { FormEventHandler, useRef } from 'react';
import { Option, VehicleUpdateModalItem } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  Depot,
  FuelCard,
  GetFuelCardsDocument,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  TollTag,
  useGetItemsForUpdateVehicleQuery,
  useUpdateVehicleMutation,
  VehicleType,
} from 'generated/graphql';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';

type UpdateVehicleModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  vehicle: VehicleUpdateModalItem;
};

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  return options;
};

const getFuelCardOptions = (
  fuelCards: FuelCard[],
  vehicle: VehicleUpdateModalItem
) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  vehicle.fuelCard.id === ''
    ? options?.unshift({ value: '', label: 'None' })
    : options?.unshift(
        { value: '', label: 'None' },
        { value: vehicle.fuelCard.id, label: vehicle.fuelCard.cardNumber }
      );

  return options;
};

const getTollTagOptions = (
  tollTags: TollTag[],
  vehicle: VehicleUpdateModalItem
) => {
  const options = tollTags?.map(
    (tollTag) => ({ value: tollTag.id, label: tollTag.tagNumber } as Option)
  );

  vehicle.tollTag.id === ''
    ? options?.unshift({ value: '', label: 'None' })
    : options?.unshift(
        { value: '', label: 'None' },
        { value: vehicle.tollTag.id, label: vehicle.tollTag.tagNumber }
      );

  return options;
};

const getVehicleTypeOptions = () => {
  const options: Option[] = [
    {
      value: VehicleType.Van,
      label: VehicleType.Van,
    },
    {
      value: VehicleType.Truck,
      label: VehicleType.Truck,
    },
    {
      value: VehicleType.Trailer,
      label: VehicleType.Trailer,
    },
  ];

  return options;
};

const UpdateVehicleModal = ({
  modalState,
  setModalState,
  vehicle,
}: UpdateVehicleModalProps) => {
  const typeInputRef = useRef<HTMLSelectElement>(null);
  const registrationInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);
  const fuelCardIdInputRef = useRef<HTMLSelectElement>(null);
  const tollTagIdInputRef = useRef<HTMLSelectElement>(null);

  const cancelButtonRef = useRef(null);

  const [updateVehicle] = useUpdateVehicleMutation({
    refetchQueries: [
      { query: GetTollTagsDocument },
      { query: GetFuelCardsDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const { data, loading, error } = useGetItemsForUpdateVehicleQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    updateVehicle({
      variables: {
        updateVehicleData: {
          id: vehicle.id,
          type:
            typeInputRef.current?.value != null
              ? (typeInputRef.current.value as VehicleType)
              : VehicleType.Van,
          registration:
            registrationInputRef.current?.value != null
              ? registrationInputRef.current.value
              : '',
          make:
            makeInputRef.current?.value != null
              ? makeInputRef.current.value
              : '',
          model:
            modelInputRef.current?.value != null
              ? modelInputRef.current.value
              : '',
          owner:
            ownerInputRef.current?.value != null
              ? ownerInputRef.current.value
              : '',
          depotId:
            depotIdInputRef.current?.value != null
              ? depotIdInputRef.current.value
              : '',
          fuelCardId:
            fuelCardIdInputRef.current?.value === ''
              ? null
              : fuelCardIdInputRef.current?.value,
          tollTagId:
            tollTagIdInputRef.current?.value === ''
              ? null
              : tollTagIdInputRef.current?.value,
        },
      },
    });
  };

  return (
    <Modal
      modalState={modalState}
      cancelButtonRef={cancelButtonRef}
      setModalState={setModalState}
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
                Update Vehicle
              </Dialog.Title>
              <div className="mt-2">
                <ModalFormSelect
                  label="Type"
                  name="type"
                  required={true}
                  options={getVehicleTypeOptions()}
                  ref={typeInputRef}
                  defaultValue={
                    vehicle.type != null
                      ? (vehicle.type as VehicleType)
                      : VehicleType.Van
                  }
                />

                <ModalFormInput
                  label="Registration"
                  name="registration"
                  type="text"
                  ref={registrationInputRef}
                  required={true}
                  defaultValue={vehicle.registration}
                />

                <ModalFormInput
                  label="Make"
                  name="make"
                  type="text"
                  ref={makeInputRef}
                  required={true}
                  defaultValue={vehicle.make}
                />

                <ModalFormInput
                  label="Model"
                  name="model"
                  type="text"
                  ref={modelInputRef}
                  required={true}
                  defaultValue={vehicle.model}
                />

                <ModalFormInput
                  label="Owner"
                  name="owner"
                  type="text"
                  ref={ownerInputRef}
                  required={true}
                  defaultValue={vehicle.owner}
                />

                <ModalFormSelect
                  label="Depot"
                  name="depot"
                  required={true}
                  options={getDepotOptions(data.depots as Depot[])}
                  ref={depotIdInputRef}
                  defaultValue={
                    vehicle.depot != null ? vehicle.depot.id : undefined
                  }
                />

                <ModalFormSelect
                  label="Fuel Card"
                  name="fuelCard"
                  required={false}
                  options={getFuelCardOptions(
                    data.fuelCardsNotAssigned as FuelCard[],
                    vehicle
                  )}
                  ref={fuelCardIdInputRef}
                  defaultValue={
                    vehicle.fuelCard != null ? vehicle.fuelCard.id : undefined
                  }
                />

                <ModalFormSelect
                  label="Toll Tag"
                  name="tollTag"
                  required={false}
                  options={getTollTagOptions(
                    data.tollTagsNotAssigned as TollTag[],
                    vehicle
                  )}
                  ref={tollTagIdInputRef}
                  defaultValue={
                    vehicle.tollTag != null ? vehicle.tollTag.id : undefined
                  }
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
              onClick={() => setModalState(false)}
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

export default UpdateVehicleModal;
