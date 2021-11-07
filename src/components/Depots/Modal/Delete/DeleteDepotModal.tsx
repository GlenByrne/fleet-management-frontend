import { useReactiveVar } from '@apollo/client';
import { ExclamationIcon } from '@heroicons/react/solid';
import {
  currentDepotVar,
  deleteDepotAlertStateVar,
  deleteDepotModalStateVar,
  errorAlertStateVar,
} from 'constants/apollo-client';
import { Dialog } from '@headlessui/react';
import Modal from 'core/Modal/Modal';
import {
  GetDepotsDocument,
  GetDepotsQuery,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useDeleteDepotMutation,
} from 'generated/graphql';
import { useRef } from 'react';

const DeleteDepotModal = () => {
  const currentDepot = useReactiveVar(currentDepotVar);

  const currentModalStateVar = useReactiveVar(deleteDepotModalStateVar);

  const [deleteDepot] = useDeleteDepotMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentDepots = cache.readQuery<GetDepotsQuery>({
        query: GetDepotsDocument,
      });
      const newDepots = currentDepots?.depots?.filter((depot) =>
        depot != null
          ? depot.id !== mutationReturn?.deleteDepot.id
          : currentDepots.depots
      );
      cache.writeQuery({
        query: GetDepotsDocument,
        data: { depots: newDepots },
      });
      cache.evict({
        id: mutationReturn?.deleteDepot.id,
      });
    },
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const deleteDepotHandler = async (id: string) => {
    deleteDepotModalStateVar(false);
    try {
      await deleteDepot({
        variables: {
          data: {
            id: id,
          },
        },
      });

      deleteDepotAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={deleteDepotModalStateVar}
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
              Delete Depot: {currentDepot.name}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this depot? This will remove the
                depot from the list and disconnect any vehicles, card, and tags
                that are connected to it.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => deleteDepotHandler(currentDepot.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => deleteDepotModalStateVar(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDepotModal;
