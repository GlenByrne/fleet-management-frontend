import { FormEventHandler, useRef } from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';
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

// interface SelectableItems {
//   depots: Depot[] | undefined;
//   fuelCardsNotAssigned: FuelCard[] | undefined;
//   tollTagsNotAssigned: TollTag[] | undefined;
// }

type CreateVehicleInputs = {
  type: JSX.Element;
  registration: JSX.Element;
  make: JSX.Element;
  model: JSX.Element;
  owner: JSX.Element;
  depot: JSX.Element;
  fuelCard: JSX.Element;
  tollTag: JSX.Element;
};

type CreateVehicleModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

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
  const typeInputRef = useRef<HTMLSelectElement>(null);
  const registrationInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);
  const fuelCardIdInputRef = useRef<HTMLSelectElement>(null);
  const tollTagIdInputRef = useRef<HTMLSelectElement>(null);

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

  // const [addVehicle] = useMutation<AddVehicle>(ADD_VEHICLE, {
  //   update: (cache, { data: mutationReturn }) => {
  //     const newVehicle = mutationReturn?.addVehicle;

  //     const currentVehicles = cache.readQuery<GetVehicles>({
  //       query: GET_VEHICLES,
  //     });

  //     if (currentVehicles && newVehicle) {
  //       cache.writeQuery({
  //         query: GET_VEHICLES,
  //         data: { vehicles: [...currentVehicles.vehicles, newVehicle] },
  //       });
  //     }
  //   },
  // });

  const getCreateVehicleInputs = (
    depots: Option[] | undefined,
    fuelCards: Option[] | undefined,
    tollTags: Option[] | undefined,
    vehicleTypes: Option[]
  ) => {
    const inputs: CreateVehicleInputs = {
      type: (
        <ModalFormSelect
          label="Type"
          name="type"
          required={true}
          options={vehicleTypes}
          ref={typeInputRef}
        />
      ),
      registration: (
        <ModalFormInput
          label="Registration"
          name="registration"
          type="text"
          ref={registrationInputRef}
          required={true}
        />
      ),
      make: (
        <ModalFormInput
          label="Make"
          name="make"
          type="text"
          ref={makeInputRef}
          required={true}
        />
      ),
      model: (
        <ModalFormInput
          label="Model"
          name="model"
          type="text"
          ref={modelInputRef}
          required={true}
        />
      ),
      owner: (
        <ModalFormInput
          label="Owner"
          name="owner"
          type="text"
          ref={ownerInputRef}
          required={true}
        />
      ),
      depot: (
        <ModalFormSelect
          label="Depot"
          name="depot"
          ref={depotIdInputRef}
          required={true}
          options={depots}
        />
      ),
      fuelCard: (
        <ModalFormSelect
          label="Fuel Card"
          name="fuelCard"
          ref={fuelCardIdInputRef}
          required={false}
          options={fuelCards}
        />
      ),
      tollTag: (
        <ModalFormSelect
          label="Toll Tag"
          name="tollTag"
          ref={tollTagIdInputRef}
          required={false}
          options={tollTags}
        />
      ),
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    addVehicle({
      variables: {
        addVehicleData: {
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

  const inputs = getCreateVehicleInputs(
    getDepotOptions(data.depots as Depot[]),
    getFuelCardOptions(data.fuelCardsNotAssigned as FuelCard[]),
    getTollTagOptions(data.tollTagsNotAssigned as TollTag[]),
    getVehicleTypeOptions()
  );

  return (
    <AddModal
      modalState={modalState}
      setModalState={setModalState}
      submitHandler={submitHandler}
      heading="Add Toll Tag"
      inputs={inputs}
    />
  );
};

export default CreateVehicleModal;
