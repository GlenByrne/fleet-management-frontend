import { useMutation, useQuery } from '@apollo/client';
import { FormEventHandler, useRef } from 'react';
import { Option } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  Depot,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  GetTollTagsQuery,
  useAddTollTagMutation,
  useGetSelectableItemsForAddTollTagQuery,
} from 'generated/graphql';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';

type CreateTollTagModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const CreateTollTagModal = ({
  modalState,
  setModalState,
}: CreateTollTagModalProps) => {
  const tagNumberInputRef = useRef<HTMLInputElement>(null);
  const tagProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  const cancelButtonRef = useRef(null);

  const [addTollTag] = useAddTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const newTollTag = mutationReturn?.addTollTag;
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
      });
      if (currentTollTags && newTollTag) {
        cache.writeQuery({
          query: GetTollTagsDocument,
          data: { tollTags: [{ ...currentTollTags.tollTags }, newTollTag] },
        });
      }
    },
    refetchQueries: [
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    addTollTag({
      variables: {
        addTollTagData: {
          tagNumber:
            tagNumberInputRef.current?.value != null
              ? tagNumberInputRef.current.value
              : '',
          tagProvider:
            tagProviderInputRef.current?.value != null
              ? tagProviderInputRef.current.value
              : '',
          depotId:
            depotIdInputRef.current?.value != null
              ? depotIdInputRef.current.value
              : '',
        },
      },
    });
  };

  const { data, loading, error } = useGetSelectableItemsForAddTollTagQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Modal
      modalState={modalState}
      cancelButtonRef={cancelButtonRef}
      setModalState={setModalState}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={submitHandler}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <TruckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Add Toll Tag
              </Dialog.Title>
              <div className="mt-2">
                <ModalFormInput
                  label="Tag Number"
                  name="tagNumber"
                  type="text"
                  ref={tagNumberInputRef}
                  required={true}
                />

                <ModalFormInput
                  label="Tag Provider"
                  name="tagProvider"
                  type="text"
                  ref={tagProviderInputRef}
                  required={true}
                />

                <ModalFormSelect
                  label="Depot"
                  name="depot"
                  ref={depotIdInputRef}
                  required={true}
                  options={getDepotOptions(data.depots as Depot[])}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setModalState(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTollTagModal;
