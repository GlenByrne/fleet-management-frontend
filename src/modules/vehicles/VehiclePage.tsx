import React, { useState } from 'react';
import VehicleTemplate from 'src/templates/VehicleTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { VehicleUpdateModalItem } from '@/constants/types';
import CreateVehicleModal from '@/modules/vehicles/addVehicleModal/CreateVehicleModal';
import DeleteVehicleModal from '@/modules/vehicles/deleteVehicleModal/DeleteVehicleModal';
import UpdateVehicleModal from '@/modules/vehicles/updateVehicleModal/UpdateVehicleModal';
import VehicleList from '@/modules/vehicles/vehicleList/VehicleList';
import { Vehicle, VehicleType } from '@/generated/graphql';

function VehiclePage() {
  const [addVehicleModalState, setAddVehicleModalState] = useState(false);
  const [updateVehicleModalState, setUpdateVehicleModalState] = useState(false);
  const [, setUpdateVehicleCVRTModalState] = useState(false);
  const [, setUpdateVehicleThirteenWeekModalState] = useState(false);
  const [, setUpdateVehicleTachoCalibrationModalState] = useState(false);

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeMobileMenuOpenState = (newState: boolean) => {
    setMobileMenuOpen(newState);
  };
  return (
    <VehicleTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={changeMobileMenuOpenState}
          // searchSubmitHandler={searchSubmitHandler}
          // changeSearchCriteria={changeSearchCriteria}
          quickAction={changeAddVehicleModalState}
          quickActionLabel="New Vehicle"
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={changeMobileMenuOpenState}
        />
      }
      content={
        <>
          <CreateVehicleModal
            modalState={addVehicleModalState}
            changeModalState={changeAddVehicleModalState}
          />
          <UpdateVehicleModal
            currentVehicle={currentVehicle}
            modalState={updateVehicleModalState}
            changeModalState={changeUpdateVehicleModalState}
          />
          <DeleteVehicleModal
            currentVehicle={currentVehicle}
            modalState={deleteVehicleModalState}
            changeModalState={changeDeleteVehicleModalState}
          />
          <VehicleList
            changeAddVehicleModalState={changeAddVehicleModalState}
            changeDeleteVehicleModalState={changeDeleteVehicleModalState}
            changeUpdateVehicleModalState={changeUpdateVehicleModalState}
            changeUpdateVehicleCVRTModalState={
              changeUpdateVehicleCVRTModalState
            }
            changeUpdateVehicleThirteenWeekModalState={
              changeUpdateVehicleThirteenWeekModalState
            }
            changeUpdateVehicleTachoCalibrationModalState={
              changeUpdateVehicleTachoCalibrationModalState
            }
            changeCurrentVehicle={changeCurrentVehicle}
          />
        </>
      }
    />
  );
}

export default VehiclePage;
