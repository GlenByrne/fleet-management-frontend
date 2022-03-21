import { TruckIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState, FormEvent, FormEventHandler, MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import SuccessButton from '@/components/atoms/Button/SuccessButton';
import CancelButton from '@/components/atoms/Button/CancelButton';
import { useAddFuelCardMutation } from '@/generated/graphql';

type AddFuelCardFormProps = {
  changeModalState: (newState: boolean) => void;
  cancelButtonRef: MutableRefObject<null>;
};

function AddFuelCardForm({
  changeModalState,
  cancelButtonRef,
}: AddFuelCardFormProps) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [cardNumber, setCardNumber] = useState('');
  const [cardProvider, setCardProvider] = useState('');

  const changeCardNumber = (event: FormEvent<HTMLInputElement>) => {
    setCardNumber(event.currentTarget.value);
  };

  const changeCardProvider = (event: FormEvent<HTMLInputElement>) => {
    setCardProvider(event.currentTarget.value);
  };

  const [addFuelCard] = useAddFuelCardMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await addFuelCard({
        variables: {
          data: {
            cardNumber: cardNumber != null ? cardNumber : '',
            cardProvider: cardProvider != null ? cardProvider : '',
            organisationId,
          },
        },
      });
    } catch {}

    setCardNumber('');
    setCardProvider('');
  };

  return (
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
              Add Fuel Card
            </Dialog.Title>
            <div className="mt-2 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <ModalFormInput
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={changeCardNumber}
                  required
                  {...re}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <ModalFormInput
                  label="Card Provider"
                  name="cardProvider"
                  type="text"
                  value={cardProvider}
                  onChange={changeCardProvider}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <SuccessButton text="Add" type="submit" />
          <CancelButton
            onClick={() => changeModalState(false)}
            ref={cancelButtonRef}
          />
        </div>
      </form>
    </div>
  );
}

export default AddFuelCardForm;
