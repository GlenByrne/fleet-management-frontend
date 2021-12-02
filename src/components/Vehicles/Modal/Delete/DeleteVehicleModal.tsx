import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import Modal from 'core/Modal/Modal';
import {
  GetVehiclesDocument,
  GetVehiclesQuery,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  useDeleteVehicleMutation,
  GetTollTagsDocument,
  GetFuelCardsDocument,
} from 'generated/graphql';
import { useReactiveVar } from '@apollo/client';
import {
  currentVehicleVar,
  deleteVehicleModalStateVar,
  successAlertStateVar,
  successTextVar,
} from 'constants/apollo-client';
import { useRouter } from 'next/router';

const DeleteVehicleModal = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const currentVehicle = useReactiveVar(currentVehicleVar);

  const currentModalStateVar = useReactiveVar(deleteVehicleModalStateVar);

  const [deleteVehicle] = useDeleteVehicleMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentVehicles = cache.readQuery<GetVehiclesQuery>({
        query: GetVehiclesDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      });

      const newVehicles = currentVehicles?.vehicles?.filter((vehicle) =>
        vehicle != null
          ? vehicle.id !== mutationReturn?.deleteVehicle.id
          : currentVehicles.vehicles
      );

      cache.writeQuery({
        query: GetVehiclesDocument,
        variables: {
          data: {
            organisationId,
          },
        },
        data: { vehicles: newVehicles },
      });

      cache.evict({
        id: mutationReturn?.deleteVehicle.id,
      });
    },
    refetchQueries: [
      {
        query: GetTollTagsDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
      {
        query: GetFuelCardsDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
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

  const deleteVehicleHandler = async (id: string) => {
    deleteVehicleModalStateVar(false);
    try {
      await deleteVehicle({
        variables: {
          data: {
            id: id,
          },
        },
      });
      successTextVar('Vehicle deleted successfully');
      successAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Modal
        modalState={currentModalStateVar}
        setModalState={deleteVehicleModalStateVar}
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
                Delete Vehicle: {currentVehicle.registration}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this vehicle? This will remove
                  the vehicle from the list and disconnect any fuel card or toll
                  tag connected to it.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                deleteVehicleHandler(currentVehicle.id);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => deleteVehicleModalStateVar(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteVehicleModal;
