import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import Modal from 'core/Modal/Modal';
import {
  GetFuelCardsDocument,
  GetFuelCardsQuery,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useDeleteFuelCardMutation,
} from 'generated/graphql';
import { useReactiveVar } from '@apollo/client';
import {
  currentFuelCardVar,
  deleteFuelCardAlertStateVar,
  deleteFuelCardModalStateVar,
  errorAlertStateVar,
} from 'constants/apollo-client';

const DeleteFuelCardModal = () => {
  const currentCard = useReactiveVar(currentFuelCardVar);

  const currentModalStateVar = useReactiveVar(deleteFuelCardModalStateVar);

  const [deleteFuelCard] = useDeleteFuelCardMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentFuelCards = cache.readQuery<GetFuelCardsQuery>({
        query: GetFuelCardsDocument,
      });
      const newFuelCards = currentFuelCards?.fuelCards?.filter((fuelCard) =>
        fuelCard != null
          ? fuelCard.id !== mutationReturn?.deleteFuelCard.id
          : currentFuelCards.fuelCards
      );
      cache.writeQuery({
        query: GetFuelCardsDocument,
        data: { fuelCards: newFuelCards },
      });
      cache.evict({
        id: mutationReturn?.deleteFuelCard.id,
      });
    },
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const deleteCardHandler = async (id: string) => {
    deleteFuelCardModalStateVar(false);
    try {
      await deleteFuelCard({
        variables: {
          data: {
            id: id,
          },
        },
      });
      deleteFuelCardAlertStateVar(true);
    } catch {
      errorAlertStateVar(true);
      throw new Error('Error deleting fuel card');
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={deleteFuelCardModalStateVar}
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
              Delete Fuel Card: {currentCard.cardNumber}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this card? This will remove the
                fuel card from the list and disconnect the card from its
                connected vehicle.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => deleteCardHandler(currentCard.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => deleteFuelCardModalStateVar(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFuelCardModal;
