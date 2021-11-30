import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Option, VehicleUpdateModalItem } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import { Dialog } from '@headlessui/react';
import {
  Depot,
  FuelCard,
  GetFuelCardsDocument,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  TollTag,
  useGetItemsForUpdateVehicleQuery,
  useUpdateVehicleMutation,
  VehicleType,
} from 'generated/graphql';
import Modal from 'core/Modal/Modal';
import { TruckIcon } from '@heroicons/react/outline';
import { useReactiveVar } from '@apollo/client';
import {
  currentVehicleVar,
  updateVehicleModalStateVar,
  successTextVar,
  successAlertStateVar,
} from 'constants/apollo-client';
import DatePicker from 'core/DatePick';
import { useRouter } from 'next/router';

const getDepotOptions = (depots: Depot[]) => {
  const options = depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );

  options?.unshift({ value: '', label: 'None' });

  return options;
};

const getFuelCardOptions = (
  fuelCards: FuelCard[],
  vehicle: VehicleUpdateModalItem
) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ value: fuelCard.id, label: fuelCard.cardNumber } as Option)
  );

  vehicle.fuelCard.id === ''
    ? options?.unshift({ value: '', label: 'None' })
    : options?.unshift(
        { value: '', label: 'None' },
        { value: vehicle.fuelCard.id, label: vehicle.fuelCard.cardNumber }
      );

  return options;
};

const getTollTagOptions = (
  tollTags: TollTag[],
  vehicle: VehicleUpdateModalItem
) => {
  const options = tollTags?.map(
    (tollTag) => ({ value: tollTag.id, label: tollTag.tagNumber } as Option)
  );

  vehicle.tollTag.id === ''
    ? options?.unshift({ value: '', label: 'None' })
    : options?.unshift(
        { value: '', label: 'None' },
        { value: vehicle.tollTag.id, label: vehicle.tollTag.tagNumber }
      );

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

const UpdateVehicleModal = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const { data, loading, error } = useGetItemsForUpdateVehicleQuery({
    variables: {
      organisationId,
      data: {
        organisationId,
      },
    },
  });

  const currentVehicle = useReactiveVar(currentVehicleVar);
  const currentModalStateVar = useReactiveVar(updateVehicleModalStateVar);

  const [typeOptions, setTypeOptions] = useState(getVehicleTypeOptions());
  const [depotOptions, setDepotOptions] = useState(
    getDepotOptions(data?.depots as Depot[])
  );
  const [fuelCardOptions, setFuelCardOptions] = useState(
    getFuelCardOptions(data?.fuelCardsNotAssigned as FuelCard[], currentVehicle)
  );
  const [tollTagOptions, setTollTagOptions] = useState(
    getTollTagOptions(data?.tollTagsNotAssigned as TollTag[], currentVehicle)
  );

  const [type, setType] = useState<Option>({
    value: '',
    label: '',
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
      getFuelCardOptions(
        data?.fuelCardsNotAssigned as FuelCard[],
        currentVehicle
      )
    );
    setTollTagOptions(
      getTollTagOptions(data?.tollTagsNotAssigned as TollTag[], currentVehicle)
    );

    setType({
      value: currentVehicle.type,
      label: currentVehicle.type,
    });
    setRegistration(currentVehicle.registration);
    setMake(currentVehicle.make);
    setModel(currentVehicle.model);
    setOwner(currentVehicle.owner);
    setDepot({
      value: currentVehicle.depot.id != null ? currentVehicle.depot.id : '',
      label:
        currentVehicle.depot.name != null ? currentVehicle.depot.name : 'None',
    });
    setFuelCard({
      value:
        currentVehicle.fuelCard.id != null ? currentVehicle.fuelCard.id : '',
      label:
        currentVehicle.fuelCard.cardNumber != null
          ? currentVehicle.fuelCard.cardNumber
          : 'None',
    });
    setTollTag({
      value: currentVehicle.tollTag.id != null ? currentVehicle.tollTag.id : '',
      label:
        currentVehicle.tollTag.tagNumber != null
          ? currentVehicle.tollTag.tagNumber
          : 'None',
    });
    setCVRT(currentVehicle.cvrt != null ? new Date(currentVehicle.cvrt) : null);
    setThirteenWeek(
      currentVehicle.thirteenWeekInspection != null
        ? new Date(currentVehicle.thirteenWeekInspection)
        : null
    );
    setTachoCalibration(
      currentVehicle.tachoCalibration != null
        ? new Date(currentVehicle.tachoCalibration)
        : null
    );
  }, [currentVehicle, data]);

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

  const cancelButtonRef = useRef(null);

  const [updateVehicle] = useUpdateVehicleMutation({
    refetchQueries: [
      { query: GetTollTagsDocument },
      { query: GetFuelCardsDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    updateVehicleModalStateVar(false);
    try {
      await updateVehicle({
        variables: {
          data: {
            id: currentVehicle.id,
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
          },
        },
      });
      successTextVar('Vehicle updated successfully');
      successAlertStateVar(true);
    } catch {}
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
    <Modal
      modalState={currentModalStateVar}
      setModalState={updateVehicleModalStateVar}
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
                Update Vehicle
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
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => updateVehicleModalStateVar(false)}
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

export default UpdateVehicleModal;
