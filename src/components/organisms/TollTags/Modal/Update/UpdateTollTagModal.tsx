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
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import {
  GetTollTagsNotAssignedDocument,
  GetVehiclesDocument,
  UpdateTollTagInput,
  useUpdateTollTagMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type UpdateTollTagModalProps = {
  currentTollTag: UpdateTollTagInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const UpdateTollTagModal = ({
  currentTollTag,
  modalState,
  changeModalState,
}: UpdateTollTagModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [tagNumber, setTagNumber] = useState('');
  const [tagProvider, setTagProvider] = useState('');

  useEffect(() => {
    setTagNumber(currentTollTag.tagNumber);
    setTagProvider(currentTollTag.tagProvider);
  }, [currentTollTag]);

  const changeTagNumber = (event: FormEvent<HTMLInputElement>) => {
    setTagNumber(event.currentTarget.value);
  };

  const changeTagProvider = (event: FormEvent<HTMLInputElement>) => {
    setTagProvider(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateTollTag] = useUpdateTollTagMutation({
    refetchQueries: [
      {
        query: GetVehiclesDocument,
        variables: {
          organisationId: organisationId,
        },
      },
      {
        query: GetTollTagsNotAssignedDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
    ],
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateTollTag({
        variables: {
          data: {
            id: currentTollTag.id,
            tagNumber: tagNumber != null ? tagNumber : '',
            tagProvider: tagProvider != null ? tagProvider : '',
          },
        },
      });

      successTextVar('Toll Tag updated successfully');
      successAlertStateVar(true);
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
                Update Toll Tag
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Tag Number"
                    name="tagNumber"
                    type="text"
                    value={tagNumber}
                    onChange={changeTagNumber}
                    required={true}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Tag Provider"
                    name="tagProvider"
                    type="text"
                    value={tagProvider}
                    onChange={changeTagProvider}
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

export default UpdateTollTagModal;
