import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, FC, FormEventHandler, useRef, useState } from 'react';
import {
  ADD_VEHICLE,
  GET_SELECTABLE_ITEMS_FOR_ADD_VEHICLE,
  GET_VEHICLE_LIST,
} from 'constants/queries';
import { Depot, FuelCard, Option, TollTag } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';

interface SelectableItems {
  depots: Depot[] | undefined;
  fuelCardsNotAssigned: FuelCard[] | undefined;
  tollTagsNotAssigned: TollTag[] | undefined;
}

type CreateVehicleInputs = {
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

const getDepotOptions = (depots: Depot[] | undefined) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  return options;
};

const getFuelCardOptions = (fuelCards: FuelCard[] | undefined) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getTollTagOptions = (tollTags: TollTag[] | undefined) => {
  const options = tollTags?.map(
    (tollTag) => ({ value: tollTag.id, label: tollTag.tagNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const CreateVehicleModal = ({
  modalState,
  setModalState,
}: CreateVehicleModalProps) => {
  const registrationInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);
  const fuelCardIdInputRef = useRef<HTMLSelectElement>(null);
  const tollTagIdInputRef = useRef<HTMLSelectElement>(null);

  const [addVehicle] = useMutation(ADD_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  const getCreateVehicleInputs = (
    depots: Option[] | undefined,
    fuelCards: Option[] | undefined,
    tollTags: Option[] | undefined
  ) => {
    const inputs: CreateVehicleInputs = {
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
          registration: registrationInputRef.current?.value,
          make: makeInputRef.current?.value,
          model: modelInputRef.current?.value,
          owner: ownerInputRef.current?.value,
          depotId: depotIdInputRef.current?.value,
          fuelCardId: fuelCardIdInputRef.current?.value,
          tollTagId: tollTagIdInputRef.current?.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<SelectableItems>(
    GET_SELECTABLE_ITEMS_FOR_ADD_VEHICLE
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  const inputs = getCreateVehicleInputs(
    getDepotOptions(data?.depots),
    getFuelCardOptions(data?.fuelCardsNotAssigned),
    getTollTagOptions(data?.tollTagsNotAssigned)
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
