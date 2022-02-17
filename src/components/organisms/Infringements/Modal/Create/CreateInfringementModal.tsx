import {
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Dialog } from '@headlessui/react';
import { TruckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import {
  DriversInOrganisationPayload,
  GetDriversQuery,
  useAddInfringementMutation,
} from '@/generated/graphql';
import { Option } from '@/constants/types';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/Inputs/ModalFormInput';
import ModalFormSelect from '@/components/molecules/Inputs/ModalFormSelect';
import DatePickerNoClear from '@/components/molecules/Datepickers/DatePickerNoClear';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';
import { UseQueryState } from 'urql';

type CreateInfringementModalProps = {
  drivers: UseQueryState<GetDriversQuery, object>;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const getDriverOptions = (drivers: DriversInOrganisationPayload[]) => {
  const options = drivers?.map(
    (driver) => ({ value: driver.user.id, label: driver.user.name } as Option)
  );

  return options;
};

const CreateInfringementModal = ({
  drivers,
  modalState,
  changeModalState,
}: CreateInfringementModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, fetching, error } = drivers;

  const [driverOptions, setDriverOptions] = useState(
    getDriverOptions(
      data?.driversInOrganisation as DriversInOrganisationPayload[]
    )
  );
  const [description, setDescription] = useState('');
  const [dateOccured, setDateOccured] = useState(new Date());
  const [driver, setDriver] = useState<Option>({
    value: null,
    label: 'None',
  });

  useEffect(() => {
    setDriverOptions(
      getDriverOptions(
        data?.driversInOrganisation as DriversInOrganisationPayload[]
      )
    );
  }, [data]);

  const changeDescription = (event: FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value);
  };

  const [addInfringementResult, addInfringement] = useAddInfringementMutation();

  const cancelButtonRef = useRef(null);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (driver.value != null) {
      changeModalState(false);
      const variables = {
        data: {
          description: description,
          driverId: driver.value,
          dateOccured: dateOccured,
          organisationId,
        },
      };
      try {
        await addInfringement(variables);
      } catch {}

      setDescription('');
      setDateOccured(new Date());
      setDriver({
        value: null,
        label: 'None',
      });
    } else {
    }
  };

  if (fetching) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <Modal
        modalState={modalState}
        setModalState={changeModalState}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <form onSubmit={submitHandler}>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <TruckIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Infringement
                </Dialog.Title>
                <div className="mt-2 grid grid-cols-6 gap-6">
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
              <SuccessButton text="Add" type="submit" />
              <CancelButton
                onClick={() => changeModalState(false)}
                ref={cancelButtonRef}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateInfringementModal;
