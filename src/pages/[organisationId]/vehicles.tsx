import { NextPage } from 'next';
import SideNav from '@/components/organisms/SideNav';
import CreateVehicleModal from '@/components/organisms/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from '@/components/organisms/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from '@/components/organisms/Vehicles/Modal/Delete/DeleteVehicleModal';
import VehicleList from '@/components/organisms/Vehicles/List/VehicleList';
import { VehicleUpdateModalItem } from '@/constants/types';
import {
  useGetDepotsQuery,
  useGetFuelCardsNotAssignedQuery,
  useGetTollTagsNotAssignedQuery,
  useGetVehiclesQuery,
  Vehicle,
  VehicleType,
} from '@/generated/graphql';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import VehicleTemplate from '@/components/templates/VehicleTemplate';
import HeaderWithSearchBarAndQuickActionButton from '@/components/organisms/HeaderWithSearchBarAndQuickActionButton';

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

  const [vehicles, refetchGetVehicles] = useGetVehiclesQuery({
    variables: {
      first: 10,
      data: {
        organisationId,
      },
    },
  });

  const [fuelCardsNotAssigned, refetchGetFuelCards] =
    useGetFuelCardsNotAssignedQuery({
      variables: {
        data: {
          organisationId,
        },
      },
    });

  const [tollTagsNotAssigned, refetchGetTollTags] =
    useGetTollTagsNotAssignedQuery({
      variables: {
        data: {
          organisationId,
        },
      },
    });

  const [depots, refetchGetDepots] = useGetDepotsQuery({
    variables: {
      first: 10,
      data: {
        organisationId,
      },
    },
  });

  const errors =
    vehicles.error ||
    fuelCardsNotAssigned.error ||
    tollTagsNotAssigned.error ||
    depots.error;

  const loading =
    vehicles.fetching ||
    fuelCardsNotAssigned.fetching ||
    tollTagsNotAssigned.fetching ||
    depots.fetching;

  const endCursor = vehicles.data?.vehicles?.pageInfo.endCursor;

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const searchSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetchGetVehicles({
      first: 10,
      data: {
        searchCriteria: searchCriteria,
        organisationId,
      },
    });
  };

  // const fetchMoreVehicles = () => {
  //   vehicles.fetchMore({
  //     variables: {
  //       after: endCursor,
  //     },
  //   });
  // };

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
            depots={depots}
            fuelCardsNotAssigned={fuelCardsNotAssigned}
            tollTagsNotAssigned={tollTagsNotAssigned}
          />
          <UpdateVehicleModal
            currentVehicle={currentVehicle}
            modalState={updateVehicleModalState}
            changeModalState={changeUpdateVehicleModalState}
            depots={depots}
            fuelCardsNotAssigned={fuelCardsNotAssigned}
            tollTagsNotAssigned={tollTagsNotAssigned}
          />
          <DeleteVehicleModal
            searchCriteria={searchCriteria}
            currentVehicle={currentVehicle}
            modalState={deleteVehicleModalState}
            changeModalState={changeDeleteVehicleModalState}
          />
          <VehicleList
            data={vehicles.data}
            loading={vehicles.fetching}
            error={vehicles.error}
            // fetchMore={fetchMoreVehicles}
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
};

export default Vehicles;
