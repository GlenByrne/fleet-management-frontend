import HeaderWithSearchBarAndQuickActionButton from '@/components/Atomic/organisms/HeaderWithSearchBarAndQuickActionButton';
import SideNav from '@/components/Atomic/organisms/SideNav';
import VehicleList from '@/components/Atomic/organisms/Vehicles/List/VehicleList';
import CreateVehicleModal from '@/components/Atomic/organisms/Vehicles/Modal/Create/CreateVehicleModal';
import DeleteVehicleModal from '@/components/Atomic/organisms/Vehicles/Modal/Delete/DeleteVehicleModal';
import UpdateVehicleModal from '@/components/Atomic/organisms/Vehicles/Modal/Update/UpdateVehicleModal';
import VehicleTemplate from '@/components/Atomic/templates/VehicleTemplate';
import { VehicleUpdateModalItem } from '@/constants/types';
import { Vehicle, GetVehiclesQuery } from '@/generated/graphql';
import { ApolloError } from '@apollo/client';
import { FormEvent, FormEventHandler } from 'react';

type VehiclesProps = {
  data: GetVehiclesQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (newState: boolean) => void;
  searchSubmitHandler: FormEventHandler<Element>;
  searchCriteria: string | null;
  changeSearchCriteria: (event: FormEvent<HTMLInputElement>) => void;
  quickAction: (state: boolean) => void;
  quickActionLabel: string;
  currentVehicle: VehicleUpdateModalItem;
  changeCurrentVehicle: (vehicle: Vehicle) => void;
  addVehicleModalState: boolean;
  updateVehicleModalState: boolean;
  deleteVehicleModalState: boolean;
  changeAddVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleModalState: (newState: boolean) => void;
  changeUpdateVehicleCVRTModalState: (newState: boolean) => void;
  changeUpdateVehicleThirteenWeekModalState: (newState: boolean) => void;
  changeUpdateVehicleTachoCalibrationModalState: (newState: boolean) => void;
  changeDeleteVehicleModalState: (newState: boolean) => void;
};

const VehiclesPage = ({
  data,
  loading,
  error,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchCriteria,
  changeSearchCriteria,
  searchSubmitHandler,
  quickAction,
  quickActionLabel,
  currentVehicle,
  changeCurrentVehicle,
  addVehicleModalState,
  updateVehicleModalState,
  deleteVehicleModalState,
  changeAddVehicleModalState,
  changeUpdateVehicleModalState,
  changeUpdateVehicleCVRTModalState,
  changeUpdateVehicleThirteenWeekModalState,
  changeUpdateVehicleTachoCalibrationModalState,
  changeDeleteVehicleModalState,
}: VehiclesProps) => {
  return (
    <VehicleTemplate
      header={
        <HeaderWithSearchBarAndQuickActionButton
          setMobileMenuOpen={setMobileMenuOpen}
          searchSubmitHandler={searchSubmitHandler}
          changeSearchCriteria={changeSearchCriteria}
          quickAction={quickAction}
          quickActionLabel={quickActionLabel}
        />
      }
      sidebar={
        <SideNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
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
          <VehicleList
            data={data}
            loading={loading}
            error={error}
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

export default VehiclesPage;
