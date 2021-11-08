import { NextPage } from 'next';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from 'components/Vehicles/Modal/Delete/DeleteVehicleModal';
import { addVehicleModalStateVar } from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetVehiclesQuery } from 'generated/graphql';
import CreateVehicleAlert from 'components/Vehicles/Alerts/CreateVehicleAlert';
import UpdateVehicleAlert from 'components/Vehicles/Alerts/UpdateVehicleAlert';
import DeleteVehicleAlert from 'components/Vehicles/Alerts/DeleteVehicleAlert';
import UpdateVehicleTachoCalibrationModal from 'components/Vehicles/Modal/Update/UpdateVehicleTachoCalibrationModal';
import UpdateVehicleTachoCalibrationAlert from 'components/Vehicles/Alerts/UpdateVehicleTachoCalibrationAlert';
import UpdateVehicleCVRTModal from 'components/Vehicles/Modal/Update/UpdateVehicleCVRTModal';
import UpdateVehicleCVRTAlert from 'components/Vehicles/Alerts/UpdateVehicleCVRTAlert';
import UpdateVehicleThirteenWeekAlert from 'components/Vehicles/Alerts/UpdateVehicleThirteenWeekInspectionAlert';
import UpdateVehicleThirteenWeekModal from 'components/Vehicles/Modal/Update/UpdateVehicleThirteenWeekInspectionModal';

const Vehicles: NextPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<string | null>(null);
  const { data, loading, error, refetch } = useGetVehiclesQuery();

  const changeSearchCriteria = (event: FormEvent<HTMLInputElement>) => {
    setSearchCriteria(event.currentTarget.value);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    refetch({
      data: {
        searchCriteria: searchCriteria,
      },
    });
  };

  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addVehicleModalStateVar}
      quickActionLabel="New Vehicle"
      pageSearchable={true}
      searchSubmitHandler={submitHandler}
      setSearchCriteria={changeSearchCriteria}
    >
      <CreateVehicleModal />
      <UpdateVehicleModal />
      <DeleteVehicleModal />
      <CreateVehicleAlert />
      <UpdateVehicleAlert />
      <DeleteVehicleAlert />
      <UpdateVehicleCVRTModal />
      <UpdateVehicleCVRTAlert />
      <UpdateVehicleThirteenWeekModal />
      <UpdateVehicleThirteenWeekAlert />
      <UpdateVehicleTachoCalibrationModal />
      <UpdateVehicleTachoCalibrationAlert />
      <VehicleList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default Vehicles;
