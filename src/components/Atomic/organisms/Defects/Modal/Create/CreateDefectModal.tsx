import { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import {
  GetVehicleDefectsDocument,
  GetVehicleDefectsQuery,
  useAddDefectMutation,
} from '@/generated/graphql';
import Modal from '@/components/Atomic/atoms/Modal';
import ModalFormInput from '@/components/Atomic/molecules/ModalFormInput';
import SuccessButton from '@/components/Atomic/atoms/SuccessButton';
import CancelButton from '@/components/Atomic/atoms/CancelButton';

type CreateDefectModalProps = {
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const CreateDefectModal = ({
  modalState,
  changeModalState,
}: CreateDefectModalProps) => {
  const router = useRouter();
  const vehicleId = String(router.query.id);

  const [description, setDescription] = useState('');

  const changeDescription = (event: FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [addDefect] = useAddDefectMutation({
    update: (cache, { data: mutationReturn }) => {
      const newDefect = mutationReturn?.addDefect;
      const currentDefects = cache.readQuery<GetVehicleDefectsQuery>({
        query: GetVehicleDefectsDocument,
        variables: {
          vehicleId: vehicleId,
        },
      });

      if (currentDefects && newDefect) {
        cache.writeQuery({
          query: GetVehicleDefectsDocument,
          data: {
            defectsForVehicle: [
              { ...currentDefects.defectsForVehicle },
              newDefect,
            ],
          },
          variables: {
            vehicleId: vehicleId,
          },
        });
      }
    },
    refetchQueries: [],
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);

    try {
      await addDefect({
        variables: {
          data: {
            description: description != null ? description : '',
            vehicleId: vehicleId,
          },
        },
      });

      successTextVar('Defect added successfully');
      successAlertStateVar(true);
    } catch {}

    setDescription('');
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
                Add Defect
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={changeDescription}
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

export default CreateDefectModal;
