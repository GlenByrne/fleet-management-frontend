import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import {
  Defect,
  GetVehicleDefectsDocument,
  GetVehicleDefectsQuery,
  useDeleteDefectMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import DangerButton from '@/components/atoms/DangerButton';
import CancelButton from '@/components/atoms/CancelButton';

type DeleteDefectModalProps = {
  currentDefect: Defect;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const DeleteDefectModal = ({
  currentDefect,
  modalState,
  changeModalState,
}: DeleteDefectModalProps) => {
  const router = useRouter();
  const vehicleId = String(router.query.id);

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
    changeModalState(false);
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
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
          <DangerButton
            onClick={() => deleteDefectHandler(currentDefect.id)}
            text="Delete"
          />
          <CancelButton
            onClick={() => changeModalState(false)}
            ref={cancelButtonRef}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDefectModal;