import DatePickerNoClear from '@/components/molecules/Datepickers/DatePickerNoClear';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import { VehicleUpdateModalItem } from '@/constants/types';
import Modal from '@/components/atoms/Modal';
import { useUpdateVehicleTachoCalibrationMutation } from '@/generated/graphql';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/solid';
import { useRef, useState, FormEventHandler } from 'react';

type UpdateVehicleTachoCalibrationModalProps = {
  currentVehicle: VehicleUpdateModalItem;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const UpdateVehicleTachoCalibrationModal = ({
  currentVehicle,
  modalState,
  changeModalState,
}: UpdateVehicleTachoCalibrationModalProps) => {
  const [updateTachoCalibration] = useUpdateVehicleTachoCalibrationMutation();
  const [completionDate, setCompletionDate] = useState<Date>(new Date());

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateTachoCalibration({
        variables: {
          data: {
            id: currentVehicle.id,
            completionDate: completionDate,
          },
        },
      });
      successTextVar('Vehicle tacho calibration date updated successfully');
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
                Update Tacho Calibration
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <DatePickerNoClear
                    label="Completion Date"
                    name="completionDate"
                    selected={completionDate}
                    onChange={setCompletionDate}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => changeModalState(false)}
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

export default UpdateVehicleTachoCalibrationModal;
