import { FormEventHandler, useRef } from 'react';
import { Option, VehicleUpdateModalItem } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';
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

type UpdateVehicleInputs = {
  type?: JSX.Element;
  registration?: JSX.Element;
  make?: JSX.Element;
  model?: JSX.Element;
  owner?: JSX.Element;
  depot?: JSX.Element;
  fuelCard?: JSX.Element;
  tollTag?: JSX.Element;
};

type UpdateVehicleModalProps = {
  modalState: boolean;
  modelStateHandler: (state: boolean) => void;
  vehicle: VehicleUpdateModalItem;
};

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  // options?.unshift({ value: undefined, label: 'None' });

  return options;
};

const getFuelCardOptions = (
  fuelCards: FuelCard[],
  vehicle: VehicleUpdateModalItem
) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  // options.filter((fuelcard) => fuelcard.value !== vehicle.fuelCard.id);

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

  // options.filter((tollTag) => tollTag.value !== vehicle.tollTag.id);

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
  modelStateHandler,
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

  const getUpdateVehicleInputs = (
    depots: Option[],
    fuelCards: Option[],
    tollTags: Option[],
    vehicleTypes: Option[]
  ) => {
    const inputs: UpdateVehicleInputs = {
      type: (
        <ModalFormSelect
          label="Type"
          name="type"
          required={true}
          options={vehicleTypes}
          ref={typeInputRef}
          defaultValue={
            vehicle.type != null
              ? (vehicle.type as VehicleType)
              : VehicleType.Van
          }
        />
      ),
      registration: (
        <ModalFormInput
          label="Registration"
          name="registration"
          type="text"
          ref={registrationInputRef}
          required={true}
          defaultValue={vehicle.registration}
        />
      ),
      make: (
        <ModalFormInput
          label="Make"
          name="make"
          type="text"
          ref={makeInputRef}
          required={true}
          defaultValue={vehicle.make}
        />
      ),
      model: (
        <ModalFormInput
          label="Model"
          name="model"
          type="text"
          ref={modelInputRef}
          required={true}
          defaultValue={vehicle.model}
        />
      ),
      owner: (
        <ModalFormInput
          label="Owner"
          name="owner"
          type="text"
          ref={ownerInputRef}
          required={true}
          defaultValue={vehicle.owner}
        />
      ),
      depot: (
        <ModalFormSelect
          label="Depot"
          name="depot"
          required={true}
          options={depots}
          ref={depotIdInputRef}
          defaultValue={vehicle.depot != null ? vehicle.depot.id : undefined}
        />
      ),
      fuelCard: (
        <ModalFormSelect
          label="Fuel Card"
          name="fuelCard"
          required={false}
          options={fuelCards}
          ref={fuelCardIdInputRef}
          defaultValue={
            vehicle.fuelCard != null ? vehicle.fuelCard.id : undefined
          }
        />
      ),
      tollTag: (
        <ModalFormSelect
          label="Toll Tag"
          name="tollTag"
          required={false}
          options={tollTags}
          ref={tollTagIdInputRef}
          defaultValue={
            vehicle.tollTag != null ? vehicle.tollTag.id : undefined
          }
        />
      ),
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    modelStateHandler(false);
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

  const inputs = getUpdateVehicleInputs(
    getDepotOptions(data.depots as Depot[]),
    getFuelCardOptions(data.fuelCardsNotAssigned as FuelCard[], vehicle),
    getTollTagOptions(data.tollTagsNotAssigned as TollTag[], vehicle),
    getVehicleTypeOptions()
  );

  return (
    <UpdateModal
      modalState={modalState}
      setModalState={modelStateHandler}
      submitHandler={submitHandler}
      heading="Update Vehicle"
      inputs={inputs}
    />
  );
};

export default UpdateVehicleModal;
