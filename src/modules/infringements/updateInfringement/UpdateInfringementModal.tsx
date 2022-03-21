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
import { Option } from '@/constants/types';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import ModalFormSelect from '@/components/molecules/Inputs/ModalFormSelect';
import Modal from '@/components/atoms/Modal';
import DatePickerNoClear from '@/components/molecules/Datepickers/DatePickerNoClear';
import SuccessButton from '@/components/atoms/Button/SuccessButton';
import CancelButton from '@/components/atoms/Button/CancelButton';

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

function UpdateInfringementModal({
  currentInfringement,
  modalState,
  changeModalState,
}: UpdateInfringementModalProps) {
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
            description,
            dateOccured,
            status: status.value as InfringementStatus,
          },
        },
      });
    } catch {}
  };

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
                Update Infringement
              </Dialog.Title>
              <div className="mt-2 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <ModalFormInput
                    label="Description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={changeDescription}
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <DatePickerNoClear
                    label="Date Occured"
                    name="dateOccured"
                    selected={dateOccured}
                    onChange={setDateOccured}
                    required
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
            <SuccessButton text="Save" type="submit" />
            <CancelButton
              onClick={() => changeModalState(false)}
              ref={cancelButtonRef}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateInfringementModal;
