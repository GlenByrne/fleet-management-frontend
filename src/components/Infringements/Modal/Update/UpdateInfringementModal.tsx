import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import {
  InfringementStatus,
  UpdateInfringementInput,
  useUpdateInfringementMutation,
} from '@/generated/graphql';
import {
  successAlertStateVar,
  successTextVar,
} from '@/constants/apollo-client';
import { Option } from '@/constants/types';
import ModalFormInput from '@/core/Modal/ModalFormInput';
import ModalFormSelect from '@/core/Modal/ModalFormSelect';
import Modal from '@/core/Modal/Modal';
import DatePickerNoClear from '@/components/Atomic/atoms/DatePickerNoClear';

type UpdateInfringementModalProps = {
  currentInfringement: UpdateInfringementInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const getInfringementStatuseOptions = () => {
  const options: Option[] = [
    {
      value: InfringementStatus.Unsigned,
      label: InfringementStatus.Unsigned,
    },
    {
      value: InfringementStatus.Signed,
      label: InfringementStatus.Signed,
    },
  ];

  return options;
};

const UpdateInfringementModal = ({
  currentInfringement,
  modalState,
  changeModalState,
}: UpdateInfringementModalProps) => {
  const [statusOptions, setStatusOptions] = useState(
    getInfringementStatuseOptions()
  );

  const [description, setDescription] = useState('');
  const [dateOccured, setDateOccured] = useState(new Date());
  const [status, setStatus] = useState<Option>({
    value: InfringementStatus.Unsigned,
    label: InfringementStatus.Unsigned,
  });

  useEffect(() => {
    setStatusOptions(getInfringementStatuseOptions());
    setDescription(currentInfringement.description);
    setDateOccured(new Date(currentInfringement.dateOccured));
    setStatus({
      value: currentInfringement.status,
      label: currentInfringement.status,
    });
  }, [currentInfringement]);

  const changeDescription = (event: FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateInfringement] = useUpdateInfringementMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await updateInfringement({
        variables: {
          data: {
            id: currentInfringement.id,
            description: description,
            dateOccured: dateOccured,
            status: status.value as InfringementStatus,
          },
        },
      });

      successTextVar('Infringement updated successfully');
      successAlertStateVar(true);
    } catch {}
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
                Update Infringement
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

                <div className="col-span-6 sm:col-span-3">
                  <DatePickerNoClear
                    label="Date Occured"
                    name="dateOccured"
                    selected={dateOccured}
                    onChange={setDateOccured}
                    required={true}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <ModalFormSelect
                    label="Status"
                    name="status"
                    selected={status}
                    onChange={setStatus}
                    options={statusOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default UpdateInfringementModal;
