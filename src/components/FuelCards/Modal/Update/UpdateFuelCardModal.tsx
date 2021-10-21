import { FormEventHandler, useRef } from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';
import {
  Depot,
  useGetSelectableItemsForUpdateFuelCardQuery,
  useUpdateFuelCardMutation,
} from 'generated/graphql';
import { FuelCardUpdateModalItem, Option } from 'constants/types';

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

  const [updateFuelCard] = useUpdateFuelCardMutation();

  const getUpdateFuelCardInputs = (depots: Option[]) => {
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

  const inputs = getUpdateFuelCardInputs(
    getDepotOptions(data.depots as Depot[])
  );

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
