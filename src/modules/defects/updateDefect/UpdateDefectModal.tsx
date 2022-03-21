import {
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { Option } from '@/constants/types';
import {
  Defect,
  DefectStatus,
  useUpdateDefectMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import ModalFormSelect from '@/components/molecules/Inputs/ModalFormSelect';
import SuccessButton from '@/components/atoms/Button/SuccessButton';
import CancelButton from '@/components/atoms/Button/CancelButton';

type UpdateDefectModalProps = {
  currentDefect: Defect;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const getDefectStatusOptions = () => {
  const options: Option[] = [
    {
      value: DefectStatus.Incomplete,
      label: DefectStatus.Incomplete,
    },
    {
      value: DefectStatus.Complete,
      label: DefectStatus.Complete,
    },
  ];

  return options;
};

function UpdateDefectModal({
  currentDefect,
  modalState,
  changeModalState,
}: UpdateDefectModalProps) {
  const [statusOptions, setStatusOptions] = useState(getDefectStatusOptions());

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Option>({
    value: '',
    label: '',
  });

  useEffect(() => {
    setStatusOptions(getDefectStatusOptions);

    setDescription(currentDefect.description);
    setStatus({
      value: currentDefect.status,
      label: currentDefect.status,
    });
  }, [currentDefect]);

  const changeDescription = (event: FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const cancelButtonRef = useRef(null);

  const [updateDefect] = useUpdateDefectMutation();

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);

    try {
      await updateDefect({
        variables: {
          data: {
            id: currentDefect.id,
            description: description != null ? description : '',
            status: status.value as DefectStatus,
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
                Update Defect
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

export default UpdateDefectModal;
