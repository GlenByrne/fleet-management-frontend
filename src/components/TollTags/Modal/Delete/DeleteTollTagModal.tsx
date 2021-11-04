import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import Modal from 'core/Modal/Modal';
import {
  GetTollTagsDocument,
  GetTollTagsQuery,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useDeleteTollTagMutation,
} from 'generated/graphql';
import { useReactiveVar } from '@apollo/client';
import {
  currentTollTagVar,
  deleteTollTagAlertStateVar,
  deleteTollTagModalStateVar,
  errorAlertStateVar,
} from 'constants/apollo-client';

const DeleteTollTagModal = () => {
  const currentTag = useReactiveVar(currentTollTagVar);

  const currentModalStateVar = useReactiveVar(deleteTollTagModalStateVar);

  const [deleteTollTag] = useDeleteTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
      });
      const newTollTags = currentTollTags?.tollTags?.filter((tollTag) =>
        tollTag != null
          ? tollTag.id !== mutationReturn?.deleteTollTag.id
          : currentTollTags.tollTags
      );
      cache.writeQuery({
        query: GetTollTagsDocument,
        data: { tollTags: newTollTags },
      });
      cache.evict({
        id: mutationReturn?.deleteTollTag.id,
      });
    },
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const deleteTagHandler = (id: string) => {
    deleteTollTagModalStateVar(false);
    try {
      deleteTollTag({
        variables: {
          data: {
            id: id,
          },
        },
      });

      deleteTollTagAlertStateVar(true);
    } catch {
      errorAlertStateVar(true);
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={deleteTollTagModalStateVar}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Delete Toll Tag: {currentTag.tagNumber}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this tag? This will remove the
                toll tag from the list and disconnect the tag from its connected
                vehicle.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => deleteTagHandler(currentTag.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => deleteTollTagModalStateVar(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTollTagModal;
