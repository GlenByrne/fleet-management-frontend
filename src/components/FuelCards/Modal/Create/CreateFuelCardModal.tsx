import { FormEventHandler, useRef } from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';
import {
  Depot,
  GetFuelCardsDocument,
  GetFuelCardsQuery,
  useAddFuelCardMutation,
  useGetSelectableItemsForAddFuelCardQuery,
} from 'generated/graphql';
import { Option } from 'constants/types';

type CreateFuelCardInputs = {
  cardNumber: JSX.Element;
  cardProvider: JSX.Element;
  depot: JSX.Element;
};

type CreateFuelCardModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const CreateFuelCardModal = ({
  modalState,
  setModalState,
}: CreateFuelCardModalProps) => {
  const cardNumberInputRef = useRef<HTMLInputElement>(null);
  const cardProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  // const [addFuelCard] = useMutation<AddFuelCard>(ADD_FUEL_CARD, {
  //   update: (cache, { data: mutationReturn }) => {
  //     const newFuelCard = mutationReturn?.addFuelCard;

  //     const currentFuelCards = cache.readQuery<GetFuelCards>({
  //       query: GET_FUEL_CARDS,
  //     });

  //     if (currentFuelCards && newFuelCard) {
  //       cache.writeQuery({
  //         query: GET_FUEL_CARDS,
  //         data: { fuelCards: [...currentFuelCards.fuelCards, newFuelCard] },
  //       });
  //     }
  //   },
  // });

  const [addFuelCard] = useAddFuelCardMutation({
    update: (cache, { data: mutationReturn }) => {
      const newFuelCard = mutationReturn?.addFuelCard;
      const currentFuelCards = cache.readQuery<GetFuelCardsQuery>({
        query: GetFuelCardsDocument,
      });
      if (currentFuelCards && newFuelCard) {
        cache.writeQuery({
          query: GetFuelCardsDocument,
          data: { fuelCards: [{ ...currentFuelCards.fuelCards }, newFuelCard] },
        });
      }
    },
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

  const { data, loading, error } = useGetSelectableItemsForAddFuelCardQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  const inputs = getCreateFuelCardInputs(
    getDepotOptions(data.depots as Depot[])
  );

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
