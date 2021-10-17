/* This example requires Tailwind CSS v2.0+ */
import { FC, FormEventHandler, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  UPDATE_FUEL_CARD,
  GET_FUEL_CARDS,
  GET_SELECTABLE_ITEMS_FOR_UPDATE_FUEL_CARD,
} from 'constants/queries';
import { Depot, Option, FuelCardUpdateModalItem } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';

interface UpdateFuelCardData {
  depots: Depot[] | undefined;
}

type UpdateFuelCardInputs = {
  cardNumber: JSX.Element;
  cardProvider: JSX.Element;
  depot: JSX.Element;
};

type UpdateFuelCardModalProps = {
  modalState: boolean;
  modalStateHandler: (status: boolean) => void;
  fuelCard: FuelCardUpdateModalItem;
};

const getDepotOptions = (depots: Depot[] | undefined) => {
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

  const [updateFuelCard] = useMutation(UPDATE_FUEL_CARD, {
    refetchQueries: [GET_FUEL_CARDS, 'GetFuelCards'],
  });

  const getUpdateFuelCardInputs = (depots: Option[] | undefined) => {
    const inputs: UpdateFuelCardInputs = {
      cardNumber: (
        <ModalFormInput
          label="Card Number"
          name="cardNumber"
          type="text"
          ref={cardNumberInputRef}
          required={true}
          defaultValue={fuelCard.cardNumber}
        />
      ),
      cardProvider: (
        <ModalFormInput
          label="Card Provider"
          name="cardProvider"
          type="text"
          ref={cardProviderInputRef}
          required={true}
          defaultValue={fuelCard.cardProvider}
        />
      ),
      depot: (
        <ModalFormSelect
          label="Depot"
          name="depot"
          ref={depotIdInputRef}
          required={true}
          options={depots}
          defaultValue={fuelCard.depot.id}
        />
      ),
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    modalStateHandler(false);
    updateFuelCard({
      variables: {
        updateFuelCardData: {
          id: fuelCard.id,
          cardNumber: cardNumberInputRef.current?.value,
          cardProvider: cardProviderInputRef.current?.value,
          depotId:
            depotIdInputRef.current?.value === ''
              ? null
              : depotIdInputRef.current?.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<UpdateFuelCardData>(
    GET_SELECTABLE_ITEMS_FOR_UPDATE_FUEL_CARD
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  const inputs = getUpdateFuelCardInputs(getDepotOptions(data?.depots));

  return (
    <UpdateModal
      modalState={modalState}
      setModalState={modalStateHandler}
      submitHandler={submitHandler}
      heading="Update Fuel Card"
      inputs={inputs}
    />
  );
};

export default UpdateFuelCardModal;
