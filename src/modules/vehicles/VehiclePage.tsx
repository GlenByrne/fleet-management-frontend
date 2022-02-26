import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { VehicleUpdateModalItem } from '@/constants/types';
import CreateVehicleModal from '@/modules/vehicles/addVehicleModal/CreateVehicleModal';
import DeleteVehicleModal from '@/modules/vehicles/deleteVehicleModal/DeleteVehicleModal';
import UpdateVehicleModal from '@/modules/vehicles/updateVehicleModal/UpdateVehicleModal';
import VehicleList from '@/modules/vehicles/vehicleList/VehicleList';
import { Vehicle, useGetVehiclesQuery, VehicleType } from '@/generated/graphql';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import VehicleTemplate from 'src/templates/VehicleTemplate';

const VehiclePage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [vehiclesPaginationVariables, setVehiclesPaginationVariables] =
    useState([
      {
        first: 5,
        after: '',
      },
    ]);
  const [fuelCardsPaginationVariables, setFuelCardsPaginationVariables] =
    useState([
      {
        first: 5,
        after: '',
      },
    ]);
  const [tollTagsPaginationVariables, setTollTagsPaginationVariables] =
    useState([
      {
        first: 5,
        after: '',
      },
    ]);
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

  const [vehicles, refetchGetVehicles] = useGetVehiclesQuery({
    variables: {
      ...fuelCardsPaginationVariables,
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
    refetchGetVehicles({
      ...fuelCardsPaginationVariables,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
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
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
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
            searchCriteria={searchCriteria}
            currentVehicle={currentVehicle}
            modalState={deleteVehicleModalState}
            changeModalState={changeDeleteVehicleModalState}
          />
          {fuelCardsPaginationVariables.map((variables, i) => (
            <VehicleList
              key={'' + variables.after}
              variables={variables}
              isLastPage={i === fuelCardsPaginationVariables.length - 1}
              onLoadMore={(after: string) =>
                setFuelCardsPaginationVariables([
                  ...fuelCardsPaginationVariables,
                  { after, first: 10 },
                ])
              }
              vehiclesList={vehicles}
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
          ))}
        </>
      }
    />
  );
};

export default VehiclePage;
