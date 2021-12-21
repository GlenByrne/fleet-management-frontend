import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import {
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  GetTollTagsQuery,
  useAddTollTagMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/ModalFormInput';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type CreateTollTagModalProps = {
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const CreateTollTagModal = ({
  modalState,
  changeModalState,
}: CreateTollTagModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [tagNumber, setTagNumber] = useState('');
  const [tagProvider, setTagProvider] = useState('');

  const changeTagNumber = (event: FormEvent<HTMLInputElement>) => {
    setTagNumber(event.currentTarget.value);
  };

  const changeTagProvider = (event: FormEvent<HTMLInputElement>) => {
    setTagProvider(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [addTollTag] = useAddTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const newTollTag = mutationReturn?.addTollTag;
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      });
      if (currentTollTags && newTollTag) {
        cache.writeQuery({
          query: GetTollTagsDocument,
          variables: {
            data: {
              organisationId,
            },
          },
          data: { tollTags: [{ ...currentTollTags.tollTags }, newTollTag] },
        });
      }
    },
    refetchQueries: [
      {
        query: GetSelectableItemsForAddVehicleDocument,
        variables: {
          organisationId,
          data: {
            organisationId,
          },
        },
      },
      {
        query: GetItemsForUpdateVehicleDocument,
        variables: {
          organisationId,
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
      await addTollTag({
        variables: {
          data: {
            tagNumber: tagNumber != null ? tagNumber : '',
            tagProvider: tagProvider != null ? tagProvider : '',
            organisationId,
          },
        },
      });

      successTextVar('Toll Tag added successfully');
      successAlertStateVar(true);
    } catch {}

    setTagNumber('');
    setTagProvider('');
  };

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Add Toll Tag
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
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
            <SuccessButton text="Add" type="submit" />
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

export default CreateTollTagModal;
