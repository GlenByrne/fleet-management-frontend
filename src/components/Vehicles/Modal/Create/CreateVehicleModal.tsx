import { FormEvent, FormEventHandler, useRef, useState } from 'react';
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
  GetVehiclesDocument,
  GetVehiclesQuery,
  TollTag,
  useAddVehicleMutation,
  useGetSelectableItemsForAddVehicleQuery,
  VehicleType,
} from 'generated/graphql';
import { Option } from 'constants/types';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';

type CreateVehicleModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getFuelCardOptions = (fuelCards: FuelCard[]) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getTollTagOptions = (tollTags: TollTag[]) => {
  const options = tollTags?.map(
    (tollTag) => ({ value: tollTag.id, label: tollTag.tagNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

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

const CreateVehicleModal = ({
  modalState,
  setModalState,
}: CreateVehicleModalProps) => {
  const [type, setType] = useState<Option>({
    value: VehicleType.Van,
    label: VehicleType.Van,
  });
  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');
  const [depot, setDepot] = useState<Option>({
    value: '',
    label: 'None',
  });
  const [fuelCard, setFuelCard] = useState<Option>({
    value: '',
    label: 'None',
  });
  const [tollTag, setTollTag] = useState<Option>({
    value: '',
    label: 'None',
  });

  const changeRegistration = (event: FormEvent<HTMLInputElement>) => {
    setRegistration(event.currentTarget.value);
  };

  const changeMake = (event: FormEvent<HTMLInputElement>) => {
    setMake(event.currentTarget.value);
  };

  const changeModel = (event: FormEvent<HTMLInputElement>) => {
    setModel(event.currentTarget.value);
  };

  const changeOwner = (event: FormEvent<HTMLInputElement>) => {
    setOwner(event.currentTarget.value);
  };

  const [addVehicle] = useAddVehicleMutation({
    update: (cache, { data: mutationReturn }) => {
      const newVehicle = mutationReturn?.addVehicle;

      const currentVehicles = cache.readQuery<GetVehiclesQuery>({
        query: GetVehiclesDocument,
      });

      if (currentVehicles && newVehicle) {
        cache.writeQuery({
          query: GetVehiclesDocument,
          data: { vehicles: [{ ...currentVehicles.vehicles }, newVehicle] },
        });
      }
    },
    refetchQueries: [
      { query: GetTollTagsDocument },
      { query: GetFuelCardsDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const cancelButtonRef = useRef(null);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    addVehicle({
      variables: {
        addVehicleData: {
          type:
            type.value != null ? (type.value as VehicleType) : VehicleType.Van,
          registration: registration != null ? registration : '',
          make: make != null ? make : '',
          model: model != null ? model : '',
          owner: owner != null ? owner : '',
          depotId: depot.value != null ? depot.value : '',
          fuelCardId: fuelCard.value === '' ? null : fuelCard.value,
          tollTagId: tollTag.value === '' ? null : tollTag.value,
        },
      },
    });
  };

  const { data, loading, error } = useGetSelectableItemsForAddVehicleQuery();

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
                Add Vehicle
              </Dialog.Title>
              <div className="mt-2">
                <ModalFormSelect
                  label="Type"
                  name="type"
                  selected={type}
                  onChange={setType}
                  options={getVehicleTypeOptions()}
                />

                <ModalFormInput
                  label="Registration"
                  name="registration"
                  type="text"
                  value={registration}
                  onChange={changeRegistration}
                  required={true}
                />

                <ModalFormInput
                  label="Make"
                  name="make"
                  type="text"
                  value={make}
                  onChange={changeMake}
                  required={true}
                />

                <ModalFormInput
                  label="Model"
                  name="model"
                  type="text"
                  value={model}
                  onChange={changeModel}
                  required={true}
                />

                <ModalFormInput
                  label="Owner"
                  name="owner"
                  type="text"
                  value={owner}
                  onChange={changeOwner}
                  required={true}
                />

                <ModalFormSelect
                  label="Depot"
                  name="depot"
                  selected={depot}
                  onChange={setDepot}
                  options={getDepotOptions(data.depots as Depot[])}
                />

                <ModalFormSelect
                  label="Fuel Card"
                  name="fuelCard"
                  selected={fuelCard}
                  onChange={setFuelCard}
                  options={getFuelCardOptions(
                    data.fuelCardsNotAssigned as FuelCard[]
                  )}
                />

                <ModalFormSelect
                  label="Toll Tag"
                  name="tollTag"
                  selected={tollTag}
                  onChange={setTollTag}
                  options={getTollTagOptions(
                    data.tollTagsNotAssigned as TollTag[]
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add
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

export default CreateVehicleModal;
