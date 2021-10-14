/* This example requires Tailwind CSS v2.0+ */
import { FC, FormEventHandler, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  UPDATE_VEHICLE,
  GET_VEHICLE_LIST,
  GET_ITEMS_FOR_UPDATE_VEHICLE,
} from 'constants/queries';
import { Depot, FuelCard, Option, TollTag, Vehicle } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';

interface UpdateVehicleData {
  vehicle: Vehicle;
  depots: Depot[] | undefined;
  currentFuelCardAndUnassigned: FuelCard[] | undefined;
  tollTags: TollTag[] | undefined;
}

type UpdateVehicleInputs = {
  registration?: JSX.Element;
  make?: JSX.Element;
  model?: JSX.Element;
  owner?: JSX.Element;
  depot?: JSX.Element;
  fuelCard?: JSX.Element;
  tollTag?: JSX.Element;
};

type UpdateVehicleModalProps = {
  modalState: boolean;
  modelStateHandler: (state: boolean) => void;
  vehicleId: string;
};

const getDepotOptions = (depots: Depot[] | undefined) => {
  const options = depots?.map(
    (depot) => ({ id: depot.id, value: depot.name } as Option)
  );

  options?.unshift({ id: 'null', value: 'None' });

  return options;
};

const getFuelCardOptions = (fuelCards: FuelCard[] | undefined) => {
  const options = fuelCards?.map(
    (fuelCard) => ({ id: fuelCard.id, value: fuelCard.cardNumber } as Option)
  );

  options?.unshift({ id: 'null', value: 'None' });

  return options;
};

const getTollTagOptions = (tollTags: TollTag[] | undefined) => {
  const options = tollTags?.map(
    (tollTag) => ({ id: tollTag.id, value: tollTag.tagNumber } as Option)
  );

  options?.unshift({ id: 'null', value: 'None' });

  return options;
};

const UpdateVehicleModal: FC<UpdateVehicleModalProps> = ({
  modalState,
  modelStateHandler,
  vehicleId,
}) => {
  const registrationInputRef = useRef<HTMLInputElement>(null);
  const makeInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);
  const fuelCardIdInputRef = useRef<HTMLSelectElement>(null);
  const tollTagIdInputRef = useRef<HTMLSelectElement>(null);

  const [updateVehicle] = useMutation(UPDATE_VEHICLE, {
    refetchQueries: [GET_VEHICLE_LIST, 'GetVehicleList'],
  });

  const { data, loading, error } = useQuery<UpdateVehicleData>(
    GET_ITEMS_FOR_UPDATE_VEHICLE,
    {
      variables: {
        vehicleId: vehicleId,
      },
    }
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div className="h2">Error</div>;
  }

  const getUpdateVehicleInputs = (
    depots: Option[] | undefined,
    fuelCards: Option[] | undefined,
    tollTags: Option[] | undefined
  ) => {
    let inputs: UpdateVehicleInputs;
    if (data.vehicle != null) {
      inputs = {
        registration: (
          <ModalFormInput
            label="Registration"
            name="registration"
            type="text"
            ref={registrationInputRef}
            required={true}
            defaultValue={data.vehicle.registration}
          />
        ),
        make: (
          <ModalFormInput
            label="Make"
            name="make"
            type="text"
            ref={makeInputRef}
            required={true}
            defaultValue={data.vehicle.make}
          />
        ),
        model: (
          <ModalFormInput
            label="Model"
            name="model"
            type="text"
            ref={modelInputRef}
            required={true}
            defaultValue={data.vehicle.model}
          />
        ),
        owner: (
          <ModalFormInput
            label="Owner"
            name="owner"
            type="text"
            ref={ownerInputRef}
            required={true}
            defaultValue={data.vehicle.owner}
          />
        ),
        depot: (
          <ModalFormSelect
            label="Depot"
            name="depot"
            ref={depotIdInputRef}
            required={true}
            options={depots}
            defaultValue={
              data.vehicle.depot != null ? data.vehicle.depot.id : 'null'
            }
          />
        ),
        fuelCard: (
          <ModalFormSelect
            label="Fuel Card"
            name="fuelCard"
            ref={fuelCardIdInputRef}
            required={true}
            options={fuelCards}
            defaultValue={
              data.vehicle.fuelCard != null ? data.vehicle.fuelCard.id : 'null'
            }
          />
        ),
        tollTag: (
          <ModalFormSelect
            label="Toll Tag"
            name="tollTag"
            ref={tollTagIdInputRef}
            required={true}
            options={tollTags}
            defaultValue={
              data.vehicle.tollTag != null ? data.vehicle.tollTag.id : 'null'
            }
          />
        ),
      };
    } else {
      inputs = {};
    }

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    modelStateHandler(false);
    updateVehicle({
      variables: {
        updateVehicleData: {
          id: vehicleId,
          registration: registrationInputRef.current?.value,
          make: makeInputRef.current?.value,
          model: modelInputRef.current?.value,
          owner: ownerInputRef.current?.value,
          depotId: depotIdInputRef.current?.value,
          fuelCardId: fuelCardIdInputRef.current?.value,
          tollTagId: tollTagIdInputRef.current?.value,
        },
      },
    });
  };

  const inputs = getUpdateVehicleInputs(
    getDepotOptions(data?.depots),
    getFuelCardOptions(data?.currentFuelCardAndUnassigned),
    getTollTagOptions(data?.tollTags)
  );

  return (
    <UpdateModal
      modalState={modalState}
      setModalState={modelStateHandler}
      submitHandler={submitHandler}
      heading="Update Vehicle"
      inputs={inputs}
    />
  );
};

export default UpdateVehicleModal;
