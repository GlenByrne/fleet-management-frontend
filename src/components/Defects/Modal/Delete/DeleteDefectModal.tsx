import { useReactiveVar } from '@apollo/client';
import { ExclamationIcon } from '@heroicons/react/solid';
import {
  currentDefectVar,
  deleteDefectAlertStateVar,
  deleteDefectModalStateVar,
  errorAlertStateVar,
  successAlertStateVar,
  successTextVar,
} from 'constants/apollo-client';
import { Dialog } from '@headlessui/react';
import Modal from 'core/Modal/Modal';
import {
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehicleDefectsDocument,
  GetVehicleDefectsQuery,
  GetVehiclesDocument,
  useDeleteDefectMutation,
} from 'generated/graphql';
import { useRef } from 'react';
import { useRouter } from 'next/router';

const DeleteDefectModal = () => {
  const router = useRouter();
  const vehicleId = String(router.query.id);
  const currentDefect = useReactiveVar(currentDefectVar);

  const currentModalStateVar = useReactiveVar(deleteDefectModalStateVar);

  const [deleteDefect] = useDeleteDefectMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentDefects = cache.readQuery<GetVehicleDefectsQuery>({
        query: GetVehicleDefectsDocument,
        variables: {
          vehicleId: vehicleId,
        },
      });
      const newDefects = currentDefects?.defectsForVehicle?.filter((defect) =>
        defect != null
          ? defect.id !== mutationReturn?.deleteDefect.id
          : currentDefects.defectsForVehicle
      );
      cache.writeQuery({
        query: GetVehicleDefectsDocument,
        data: { defectsForVehicle: newDefects },
        variables: {
          vehicleId: vehicleId,
        },
      });
      cache.evict({
        id: mutationReturn?.deleteDefect.id,
      });
    },
    refetchQueries: [],
  });

  const deleteDefectHandler = async (id: string) => {
    deleteDefectModalStateVar(false);
    try {
      await deleteDefect({
        variables: {
          data: {
            id: id,
          },
        },
      });

      successTextVar('Defect deleted successfully');
      successAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={deleteDefectModalStateVar}
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
              Delete Defect
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this defect?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => deleteDefectHandler(currentDefect.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => deleteDefectModalStateVar(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDefectModal;
