import { useReactiveVar } from '@apollo/client';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/solid';
import {
  currentVehicleVar,
  successAlertStateVar,
  successTextVar,
  updateVehicleCVRTAlertStateVar,
  updateVehicleCVRTModalStateVar,
} from 'constants/apollo-client';
import DatePickerNoClear from 'core/DatePickerNoClear';
import Modal from 'core/Modal/Modal';
import { useUpdateVehicleCvrtMutation } from 'generated/graphql';
import { useRef, useState, FormEventHandler } from 'react';

const UpdateVehicleCVRTModal = () => {
  const [updateCVRT] = useUpdateVehicleCvrtMutation();
  const [completionDate, setCompletionDate] = useState<Date>(new Date());

  const currentVehicle = useReactiveVar(currentVehicleVar);
  const currentModalStateVar = useReactiveVar(updateVehicleCVRTModalStateVar);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    updateVehicleCVRTModalStateVar(false);
    try {
      await updateCVRT({
        variables: {
          data: {
            id: currentVehicle.id,
          },
        },
      });
      successTextVar('Vehicle CVRT date updated successfully');
      successAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={currentModalStateVar}
      setModalState={updateVehicleCVRTModalStateVar}
      cancelButtonRef={cancelButtonRef}
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
                Update CVRT
              </Dialog.Title>
              <div className="grid grid-cols-6 gap-6 mt-2">
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
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => updateVehicleCVRTModalStateVar(false)}
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

export default UpdateVehicleCVRTModal;
