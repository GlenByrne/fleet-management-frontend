/* This example requires Tailwind CSS v2.0+ */
import { ChangeEvent, FC, FormEventHandler, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  UPDATE_VEHICLE,
  GET_VEHICLE_LIST,
  GET_ITEMS_FOR_UPDATE_VEHICLE,
} from 'constants/queries';
import {
  Depot,
  FuelCard,
  Option,
  TollTag,
  VehicleUpdateModalItem,
} from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';

interface UpdateVehicleData {
  depots: Depot[] | undefined;
  fuelCardsNotAssigned: FuelCard[] | undefined;
  tollTagsNotAssigned: TollTag[] | undefined;
}

type UpdateVehicleInputs = {
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

const getDepotOptions = (depots: Depot[] | undefined) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  // options?.unshift({ value: undefined, label: 'None' });

  return options;
};

const getFuelCardOptions = (
  fuelCards: FuelCard[] | undefined,
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
  tollTags: TollTag[] | undefined,
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

const UpdateVehicleModal = ({
  modalState,
  modelStateHandler,
  vehicle,
}: UpdateVehicleModalProps) => {
  // const [registration, setRegistration] = useState<string>(
  //   vehicle.registration
  // );
  // const [make, setMake] = useState<string>(vehicle.make);
  // const [model, setModel] = useState<string>(vehicle.model);
  // const [owner, setOwner] = useState<string>(vehicle.owner);
  // const [depotId, setDepotId] = useState<string>(vehicle.depot.id);
  // const [fuelCardId, setFuelCardId] = useState<string>(vehicle.fuelCard.id);
  // const [tollTagId, setTollTagId] = useState<string>(vehicle.tollTag.id);

  // const registrationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRegistration(event.target.value);
  // };

  // const makeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setMake(event.target.value);
  // };

  // const modelChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setModel(event.target.value);
  // };

  // const ownerChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setOwner(event.target.value);
  // };

  // const depotIdChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setDepotId(event.target.value);
  // };

  // const fuelCardIdChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setFuelCardId(event.target.value);
  // };

  // const tollTagIdChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
  //   setTollTagId(event.target.value);
  // };

  const registrationInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);
  const fuelCardIdInputRef = useRef<HTMLSelectElement>(null);
  const tollTagIdInputRef = useRef<HTMLSelectElement>(null);

  const [updateVehicle] = useMutation(UPDATE_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  const { data, loading, error } = useQuery<UpdateVehicleData>(
    GET_ITEMS_FOR_UPDATE_VEHICLE
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div className="h2">Error</div>;
  }

  const getUpdateVehicleInputs = (
    depots: Option[] | undefined,
    fuelCards: Option[] | undefined,
    tollTags: Option[] | undefined
  ) => {
    const inputs: UpdateVehicleInputs = {
      registration: (
        <ModalFormInput
          label="Registration"
          name="registration"
          type="text"
          ref={registrationInputRef}
          required={true}
          defaultValue={vehicle.registration}
          // value={registration}
          // onChange={registrationChangeHandler}
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
          // value={make}
          // onChange={makeChangeHandler}
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
          // value={model}
          // onChange={modelChangeHandler}
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
          // value={owner}
          // onChange={ownerChangeHandler}
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
          // value={depotId}
          // onChange={depotIdChangeHandler}
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
          // value={fuelCardId}
          // onChange={fuelCardIdChangeHandler}
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
          // value={tollTagId}
          // onChange={tollTagIdChangeHandler}
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
        // updateVehicleData: {
        //   id: vehicle.id,
        //   registration: registration,
        //   make: make,
        //   model: model,
        //   owner: owner,
        //   depotId: depotId,
        //   fuelCardId: fuelCardId,
        //   tollTagId: tollTagId,
        // },
        updateVehicleData: {
          id: vehicle.id,
          registration: registrationInputRef.current?.value,
          make: makeInputRef.current?.value,
          model: modelInputRef.current?.value,
          owner: ownerInputRef.current?.value,
          depotId:
            depotIdInputRef.current?.value === ''
              ? null
              : depotIdInputRef.current?.value,
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
    getDepotOptions(data?.depots),
    getFuelCardOptions(data?.fuelCardsNotAssigned, vehicle),
    getTollTagOptions(data?.tollTagsNotAssigned, vehicle)
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
