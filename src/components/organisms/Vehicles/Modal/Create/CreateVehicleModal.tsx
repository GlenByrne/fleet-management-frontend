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
import { Option } from '@/constants/types';
import {
  Depot,
  FuelCard,
  GetFuelCardsDocument,
  GetUpdateVehicleOptionsDocument,
  GetAddVehicleOptionsDocument,
  GetTollTagsDocument,
  GetVehiclesDocument,
  GetVehiclesQuery,
  TollTag,
  useAddVehicleMutation,
  VehicleType,
  useGetAddVehicleOptionsQuery,
} from '@/generated/graphql';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import Modal from '@/components/atoms/Modal';
import ModalFormInput from '@/components/molecules/ModalFormInput';
import ModalFormSelect from '@/components/molecules/ModalFormSelect';
import DatePicker from '@/components/molecules/DatePick';
import SuccessButton from '@/components/atoms/SuccessButton';
import CancelButton from '@/components/atoms/CancelButton';

type CreateVehicleModalProps = {
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getFuelCardOptions = (fuelCards: FuelCard[]) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getTollTagOptions = (tollTags: TollTag[]) => {
  const options = tollTags?.map(
    (tollTag) => ({ value: tollTag.id, label: tollTag.tagNumber } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getVehicleTypeOptions = () => {
  const options: Option[] = [
    {
      value: VehicleType.Van,
      label: VehicleType.Van,
    },
    {
      value: VehicleType.Truck,
      label: VehicleType.Truck,
    },
    {
      value: VehicleType.Trailer,
      label: VehicleType.Trailer,
    },
  ];

  return options;
};

const CreateVehicleModal = ({
  modalState,
  changeModalState,
}: CreateVehicleModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetAddVehicleOptionsQuery({
    variables: {
      organisationId,
      data: {
        organisationId,
      },
    },
  });

  const [typeOptions, setTypeOptions] = useState(getVehicleTypeOptions());
  const [depotOptions, setDepotOptions] = useState(
    getDepotOptions(data?.depots as Depot[])
  );
  const [fuelCardOptions, setFuelCardOptions] = useState(
    getFuelCardOptions(data?.fuelCardsNotAssigned as FuelCard[])
  );
  const [tollTagOptions, setTollTagOptions] = useState(
    getTollTagOptions(data?.tollTagsNotAssigned as TollTag[])
  );

  const [type, setType] = useState<Option>({
    value: VehicleType.Van,
    label: VehicleType.Van,
  });
  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');
  const [depot, setDepot] = useState<Option>({
    value: '',
    label: 'None',
  });
  const [fuelCard, setFuelCard] = useState<Option>({
    value: '',
    label: 'None',
  });
  const [tollTag, setTollTag] = useState<Option>({
    value: '',
    label: 'None',
  });

  const [cvrt, setCVRT] = useState<Date | null>(null);
  const [thirteenWeek, setThirteenWeek] = useState<Date | null>(null);
  const [tachoCalibration, setTachoCalibration] = useState<Date | null>(null);

  useEffect(() => {
    setTypeOptions(getVehicleTypeOptions());
    setDepotOptions(getDepotOptions(data?.depots as Depot[]));
    setFuelCardOptions(
      getFuelCardOptions(data?.fuelCardsNotAssigned as FuelCard[])
    );
    setTollTagOptions(
      getTollTagOptions(data?.tollTagsNotAssigned as TollTag[])
    );
  }, [data]);

  const changeRegistration = (event: FormEvent<HTMLInputElement>) => {
    setRegistration(event.currentTarget.value);
  };

  const changeMake = (event: FormEvent<HTMLInputElement>) => {
    setMake(event.currentTarget.value);
  };

  const changeModel = (event: FormEvent<HTMLInputElement>) => {
    setModel(event.currentTarget.value);
  };

  const changeOwner = (event: FormEvent<HTMLInputElement>) => {
    setOwner(event.currentTarget.value);
  };

  const [addVehicle] = useAddVehicleMutation({
    update: (cache, { data: mutationReturn }) => {
      const newVehicle = mutationReturn?.addVehicle;

      const currentVehicles = cache.readQuery<GetVehiclesQuery>({
        query: GetVehiclesDocument,
        variables: {
          data: {
            organisationId: organisationId,
          },
        },
      });

      if (currentVehicles && newVehicle) {
        cache.writeQuery({
          query: GetVehiclesDocument,
          variables: {
            data: {
              organisationId,
            },
          },
          data: { vehicles: [{ ...currentVehicles.vehicles }, newVehicle] },
        });
      }
    },
    refetchQueries: [
      {
        query: GetTollTagsDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
      {
        query: GetFuelCardsDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
      {
        query: GetAddVehicleOptionsDocument,
        variables: {
          organisationId,
          data: {
            organisationId,
          },
        },
      },
      {
        query: GetUpdateVehicleOptionsDocument,
        variables: {
          organisationId,
          data: {
            organisationId,
          },
        },
      },
    ],
  });

  const cancelButtonRef = useRef(null);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    changeModalState(false);
    try {
      await addVehicle({
        variables: {
          data: {
            type:
              type.value != null
                ? (type.value as VehicleType)
                : VehicleType.Van,
            registration: registration != null ? registration : '',
            make: make != null ? make : '',
            model: model != null ? model : '',
            owner: owner != null ? owner : '',
            cvrt: cvrt != null ? cvrt : null,
            thirteenWeekInspection: thirteenWeek != null ? thirteenWeek : null,
            tachoCalibration:
              tachoCalibration != null ? tachoCalibration : null,

            depotId: depot.value != null ? depot.value : '',
            fuelCardId: fuelCard.value === '' ? null : fuelCard.value,
            tollTagId: tollTag.value === '' ? null : tollTag.value,
            organisationId,
          },
        },
      });

      successTextVar('Vehicle added successfully');
      successAlertStateVar(true);
    } catch {}

    setType({
      value: VehicleType.Van,
      label: VehicleType.Van,
    });
    setRegistration('');
    setMake('');
    setModel('');
    setOwner('');
    setDepot({
      value: '',
      label: 'None',
    });
    setFuelCard({
      value: '',
      label: 'None',
    });
    setTollTag({
      value: '',
      label: 'None',
    });
    setCVRT(null);
    setThirteenWeek(null);
    setTachoCalibration(null);
  };

  if (loading) {
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
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={submitHandler}>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
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
                  Add Vehicle
                </Dialog.Title>
                <div className="grid grid-cols-6 gap-6 mt-2">
                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormInput
                      label="Registration"
                      name="registration"
                      type="text"
                      value={registration}
                      onChange={changeRegistration}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormInput
                      label="Make"
                      name="make"
                      type="text"
                      value={make}
                      onChange={changeMake}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormInput
                      label="Model"
                      name="model"
                      type="text"
                      value={model}
                      onChange={changeModel}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormInput
                      label="Owner"
                      name="owner"
                      type="text"
                      value={owner}
                      onChange={changeOwner}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormSelect
                      label="Type"
                      name="type"
                      selected={type}
                      onChange={setType}
                      options={typeOptions}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormSelect
                      label="Depot"
                      name="depot"
                      selected={depot}
                      onChange={setDepot}
                      options={depotOptions}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormSelect
                      label="Fuel Card"
                      name="fuelCard"
                      selected={fuelCard}
                      onChange={setFuelCard}
                      options={fuelCardOptions}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <ModalFormSelect
                      label="Toll Tag"
                      name="tollTag"
                      selected={tollTag}
                      onChange={setTollTag}
                      options={tollTagOptions}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <DatePicker
                      label="CVRT"
                      name="cvrt"
                      selected={cvrt}
                      onChange={setCVRT}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <DatePicker
                      label="13 Week"
                      name="thirteenWeek"
                      selected={thirteenWeek}
                      onChange={setThirteenWeek}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <DatePicker
                      label="Tacho Calibration"
                      name="tachoCalibration"
                      selected={tachoCalibration}
                      onChange={setTachoCalibration}
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

export default CreateVehicleModal;
