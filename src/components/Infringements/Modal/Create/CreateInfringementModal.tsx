import {
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  GetDriversDocument,
  GetDriversQuery,
  useAddInfringementMutation,
  UsersPayload,
} from 'generated/graphql';
import { Option } from 'constants/types';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';
import {
  addInfringementModalStateVar,
  errorAlertStateVar,
  errorTextVar,
  successAlertStateVar,
  successTextVar,
} from 'constants/apollo-client';
import { useReactiveVar } from '@apollo/client';
import DatePickerNoClear from 'core/DatePickerNoClear';

type CreateInfringementModalProps = {
  data: GetDriversQuery | undefined;
};

const getDriverOptions = (drivers: UsersPayload[]) => {
  const options = drivers?.map(
    (driver) => ({ value: driver.id, label: driver.name } as Option)
  );

  return options;
};

const CreateInfringementModal = ({ data }: CreateInfringementModalProps) => {
  const currentModalStateVar = useReactiveVar(addInfringementModalStateVar);
  const [driverOptions, setDriverOptions] = useState(
    getDriverOptions(data?.drivers as UsersPayload[])
  );
  const [description, setDescription] = useState('');
  const [dateOccured, setDateOccured] = useState(new Date());
  const [driver, setDriver] = useState<Option>({
    value: null,
    label: 'None',
  });

  useEffect(() => {
    setDriverOptions(getDriverOptions(data?.drivers as UsersPayload[]));
  }, [data]);

  const changeDescription = (event: FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const [addInfringement] = useAddInfringementMutation({
    update: (cache, { data: mutationReturn }) => {
      const newInfringement = mutationReturn?.addInfringement;

      const currentInfringements = cache
        .readQuery<GetDriversQuery>({
          query: GetDriversDocument,
        })
        ?.drivers?.find(
          (driver) => driver?.id === mutationReturn?.addInfringement.driver?.id
        )?.infringements;

      if (currentInfringements && newInfringement) {
        cache.writeQuery({
          query: GetDriversDocument,
          data: {
            infringements: [{ ...currentInfringements }, newInfringement],
          },
        });
      }
    },
  });

  const cancelButtonRef = useRef(null);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (driver.value != null) {
      addInfringementModalStateVar(false);
      try {
        await addInfringement({
          variables: {
            data: {
              description: description,
              driverId: driver.value,
              dateOccured: dateOccured,
            },
          },
        });

        successTextVar('Infringement added successfully');
        successAlertStateVar(true);
      } catch {}

      setDescription('');
      setDateOccured(new Date());
      setDriver({
        value: null,
        label: 'None',
      });
    } else {
      errorTextVar('A driver must be assigned to add an infringement');
      errorAlertStateVar(true);
    }
  };

  return (
    <>
      <Modal
        modalState={currentModalStateVar}
        setModalState={addInfringementModalStateVar}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={submitHandler}>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <TruckIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Add Infringement
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
                    <ModalFormSelect
                      label="Driver"
                      name="driver"
                      selected={driver}
                      onChange={setDriver}
                      options={driverOptions}
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
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => addInfringementModalStateVar(false)}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateInfringementModal;
