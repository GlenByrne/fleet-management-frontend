import { TruckIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import {
  FormEvent,
  useEffect,
  useState,
  useRef,
  FormEventHandler,
} from 'react';
import { useRouter } from 'next/router';
import {
  errorAlertStateVar,
  successAlertStateVar,
  successTextVar,
} from 'src/apollo/apollo-client';
import {
  GetVehiclesDocument,
  UpdateDepotInput,
  useUpdateDepotMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type UpdateDepotModalProps = {
  currentDepot: UpdateDepotInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const UpdateDepotModal = ({
  currentDepot,
  modalState,
  changeModalState,
}: UpdateDepotModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentDepot.name);
  }, [currentDepot]);

  const changeName = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateDepot] = useUpdateDepotMutation({
    refetchQueries: [
      {
        query: GetVehiclesDocument,
        variables: {
          data: {
            organisationId: organisationId,
          },
        },
      },
    ],
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateDepot({
        variables: {
          data: {
            id: currentDepot.id,
            name: name != null ? name : '',
          },
        },
      });

      successTextVar('Depot updated successfully');
      successAlertStateVar(true);
    } catch {
      errorAlertStateVar(true);
      throw new Error('Error updating depot');
    }
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
                    label="Name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={changeName}
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

export default UpdateDepotModal;
