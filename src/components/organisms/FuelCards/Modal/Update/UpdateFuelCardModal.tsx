import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  GetFuelCardsNotAssignedDocument,
  GetVehiclesDocument,
  UpdateFuelCardInput,
  useUpdateFuelCardMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type UpdateFuelCardModalProps = {
  currentFuelCard: UpdateFuelCardInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const UpdateFuelCardModal = ({
  currentFuelCard,
  modalState,
  changeModalState,
}: UpdateFuelCardModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  // const [modalState, setModalState] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardProvider, setCardProvider] = useState('');

  useEffect(() => {
    setCardNumber(currentFuelCard.cardNumber);
    setCardProvider(currentFuelCard.cardProvider);
  }, [currentFuelCard]);

  const changeCardNumber = (event: FormEvent<HTMLInputElement>) => {
    setCardNumber(event.currentTarget.value);
  };

  const changeCardProvider = (event: FormEvent<HTMLInputElement>) => {
    setCardProvider(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateFuelCardResult, updateFuelCard] = useUpdateFuelCardMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    const variables = {
      data: {
        id: currentFuelCard.id,
        cardNumber: cardNumber != null ? cardNumber : '',
        cardProvider: cardProvider != null ? cardProvider : '',
      },
    };
    try {
      await updateFuelCard(variables);
    } catch {}
  };

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Update Fuel Card
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={changeCardNumber}
                    required={true}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Card Provider"
                    name="cardProvider"
                    type="text"
                    value={cardProvider}
                    onChange={changeCardProvider}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <SuccessButton text="Save" type="submit" />
            <CancelButton
              onClick={() => changeModalState(false)}
              ref={cancelButtonRef}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateFuelCardModal;
