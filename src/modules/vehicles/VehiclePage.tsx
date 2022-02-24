import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/organisms/SideNav';
import { VehicleUpdateModalItem } from '@/constants/types';
import CreateVehicleModal from '@/modules/vehicles/addVehicleModal/CreateVehicleModal';
import DeleteVehicleModal from '@/modules/vehicles/deleteVehicleModal/DeleteVehicleModal';
import UpdateVehicleModal from '@/modules/vehicles/updateVehicleModal/UpdateVehicleModal';
import VehicleList from '@/modules/vehicles/vehicleList/VehicleList';
import { Vehicle, useGetVehiclesQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import VehicleTemplate from 'src/templates/VehicleTemplate';

const VehiclePage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const [pageVariables, setPageVariables] = useState([
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

  const [currentVehicleId, setCurrentVehicleId] = useState<string>('');

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

  const changeCurrentVehicleId = (id: string) => {
    setCurrentVehicleId(id);
  };

  const [vehicles, refetchGetVehicles] = useGetVehiclesQuery({
    variables: {
      ...pageVariables,
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
      ...pageVariables,
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
            currentVehicleId={currentVehicleId}
            modalState={updateVehicleModalState}
            changeModalState={changeUpdateVehicleModalState}
            depots={depots}
            fuelCardsNotAssigned={fuelCardsNotAssigned}
            tollTagsNotAssigned={tollTagsNotAssigned}
          />
          <DeleteVehicleModal
            searchCriteria={searchCriteria}
            currentVehicleId={currentVehicleId}
            modalState={deleteVehicleModalState}
            changeModalState={changeDeleteVehicleModalState}
          />
          {pageVariables.map((variables, i) => (
            <VehicleList
              key={'' + variables.after}
              variables={variables}
              isLastPage={i === pageVariables.length - 1}
              onLoadMore={(after: string) =>
                setPageVariables([...pageVariables, { after, first: 10 }])
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
              changeCurrentVehicleId={changeCurrentVehicleId}
            />
          ))}
        </>
      }
    />
  );
};

export default VehiclePage;
