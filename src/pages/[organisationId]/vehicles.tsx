import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetVehiclesQuery, Vehicle, VehicleType } from '@/generated/graphql';
import MainLayout from '@/components/templates/VehicleTemplate';
import CreateVehicleModal from '@/components/organisms/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from '@/components/organisms/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from '@/components/organisms/Vehicles/Modal/Delete/DeleteVehicleModal';
import UpdateVehicleCVRTModal from '@/components/organisms/Vehicles/Modal/Update/UpdateVehicleCVRTModal';
import UpdateVehicleThirteenWeekModal from '@/components/organisms/Vehicles/Modal/Update/UpdateVehicleThirteenWeekInspectionModal';
import UpdateVehicleTachoCalibrationModal from '@/components/organisms/Vehicles/Modal/Update/UpdateVehicleTachoCalibrationModal';
import VehicleList from '@/components/organisms/Vehicles/List/VehicleList';
import { VehicleUpdateModalItem } from '@/constants/types';
import VehiclesPage from '@/components/pages/vehicles';

const Vehicles: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [addVehicleModalState, setAddVehicleModalState] = useState(false);
  const [updateVehicleModalState, setUpdateVehicleModalState] = useState(false);
  const [updateVehicleCVRTModalState, setUpdateVehicleCVRTModalState] =
    useState(false);
  const [
    updateVehicleThirteenWeekModalState,
    setUpdateVehicleThirteenWeekModalState,
  ] = useState(false);
  const [
    updateVehicleTachoCalibrationModalState,
    setUpdateVehicleTachoCalibrationModalState,
  ] = useState(false);

  const [deleteVehicleModalState, setDeleteVehicleModalState] = useState(false);

  const [currentVehicle, setCurrentVehicle] = useState<VehicleUpdateModalItem>({
    id: '',
    type: VehicleType.Van,
    registration: '',
    make: '',
    model: '',
    owner: '',
    cvrt: new Date(),
    tachoCalibration: new Date(),
    thirteenWeekInspection: new Date(),
    depot: {
      id: '',
      name: 'None',
    },
    fuelCard: {
      id: '',
      cardNumber: 'None',
    },
    tollTag: {
      id: '',
      tagNumber: 'None',
    },
  });

  const changeAddVehicleModalState = (newState: boolean) => {
    setAddVehicleModalState(newState);
  };

  const changeUpdateVehicleModalState = (newState: boolean) => {
    setUpdateVehicleModalState(newState);
  };

  const changeUpdateVehicleCVRTModalState = (newState: boolean) => {
    setUpdateVehicleCVRTModalState(newState);
  };

  const changeUpdateVehicleThirteenWeekModalState = (newState: boolean) => {
    setUpdateVehicleThirteenWeekModalState(newState);
  };

  const changeUpdateVehicleTachoCalibrationModalState = (newState: boolean) => {
    setUpdateVehicleTachoCalibrationModalState(newState);
  };

  const changeDeleteVehicleModalState = (newState: boolean) => {
    setDeleteVehicleModalState(newState);
  };

  const changeCurrentVehicle = (vehicle: Vehicle) => {
    const chosenVehicle: VehicleUpdateModalItem = {
      id: vehicle.id,
      type: vehicle.type,
      registration: vehicle.registration,
      make: vehicle.make,
      model: vehicle.model,
      owner: vehicle.owner,
      cvrt: vehicle.cvrt,
      tachoCalibration: vehicle.tachoCalibration,
      thirteenWeekInspection: vehicle.thirteenWeekInspection,
      depot: {
        id: vehicle.depot != null ? vehicle.depot.id : '',
        name: vehicle.depot != null ? vehicle.depot.name : '',
      },
      fuelCard: {
        id: vehicle.fuelCard == null ? '' : vehicle.fuelCard.id,
        cardNumber: vehicle.fuelCard == null ? '' : vehicle.fuelCard.cardNumber,
      },
      tollTag: {
        id: vehicle.tollTag == null ? '' : vehicle.tollTag.id,
        tagNumber: vehicle.tollTag == null ? '' : vehicle.tollTag.tagNumber,
      },
    };
    setCurrentVehicle(chosenVehicle);
  };

  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetVehiclesQuery({
    variables: {
      data: {
        organisationId,
      },
    },
  });

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const accessToken = useAuthentication();

  // if (!accessToken) {
  //   return <Loading />;
  // }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };

  return (
    <VehiclesPage
      data={data}
      loading={loading}
      error={error}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={changeMobileMenuOpenState}
      searchCriteria={searchCriteria}
      changeSearchCriteria={changeSearchCriteria}
      searchSubmitHandler={searchSubmitHandler}
      quickAction={changeAddVehicleModalState}
      quickActionLabel="New Vehicle"
      currentVehicle={currentVehicle}
      changeCurrentVehicle={changeCurrentVehicle}
      addVehicleModalState={addVehicleModalState}
      updateVehicleModalState={updateVehicleModalState}
      deleteVehicleModalState={deleteVehicleModalState}
      changeAddVehicleModalState={changeAddVehicleModalState}
      changeUpdateVehicleModalState={changeUpdateVehicleModalState}
      changeUpdateVehicleCVRTModalState={changeUpdateVehicleCVRTModalState}
      changeUpdateVehicleThirteenWeekModalState={
        changeUpdateVehicleThirteenWeekModalState
      }
      changeUpdateVehicleTachoCalibrationModalState={
        changeUpdateVehicleTachoCalibrationModalState
      }
      changeDeleteVehicleModalState={changeDeleteVehicleModalState}
    />
  );
};

export default Vehicles;
