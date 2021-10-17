import { useMutation, useQuery } from '@apollo/client';
import { FC, FormEventHandler, useRef } from 'react';
import {
  ADD_FUEL_CARD,
  GET_FUEL_CARDS,
  GET_SELECTABLE_ITEMS_FOR_ADD_FUEL_CARD,
} from 'constants/queries';
import { Depot, Option } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';

interface SelectableItems {
  depots: Depot[];
}

type CreateFuelCardInputs = {
  cardNumber: JSX.Element;
  cardProvider: JSX.Element;
  depot: JSX.Element;
};

type CreateFuelCardModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[] | undefined) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const CreateFuelCardModal: FC<CreateFuelCardModalProps> = ({
  modalState,
  setModalState,
}) => {
  const cardNumberInputRef = useRef<HTMLInputElement>(null);
  const cardProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  const [addFuelCard] = useMutation(ADD_FUEL_CARD, {
    refetchQueries: [GET_FUEL_CARDS, 'GetFuelCards'],
  });

  const getCreateFuelCardInputs = (depots: Option[] | undefined) => {
    const inputs: CreateFuelCardInputs = {
      cardNumber: (
        <ModalFormInput
          label="Card Number"
          name="cardNumber"
          type="text"
          ref={cardNumberInputRef}
          required={true}
        />
      ),
      cardProvider: (
        <ModalFormInput
          label="Card Provider"
          name="cardProvider"
          type="text"
          ref={cardProviderInputRef}
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
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    addFuelCard({
      variables: {
        addFuelCardData: {
          cardNumber: cardNumberInputRef.current?.value,
          cardProvider: cardProviderInputRef.current?.value,
          depotId: depotIdInputRef.current?.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<SelectableItems>(
    GET_SELECTABLE_ITEMS_FOR_ADD_FUEL_CARD
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  const inputs = getCreateFuelCardInputs(getDepotOptions(data?.depots));

  return (
    <AddModal
      modalState={modalState}
      setModalState={setModalState}
      submitHandler={submitHandler}
      heading="Add Fuel Card"
      inputs={inputs}
    />
  );
};

export default CreateFuelCardModal;
