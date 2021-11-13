import { NextPage } from 'next';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from 'components/Vehicles/Modal/Delete/DeleteVehicleModal';
import { addVehicleModalStateVar } from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetVehiclesQuery } from 'generated/graphql';
import UpdateVehicleTachoCalibrationModal from 'components/Vehicles/Modal/Update/UpdateVehicleTachoCalibrationModal';
import UpdateVehicleCVRTModal from 'components/Vehicles/Modal/Update/UpdateVehicleCVRTModal';
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
      <UpdateVehicleCVRTModal />
      <UpdateVehicleThirteenWeekModal />
      <UpdateVehicleTachoCalibrationModal />
      <VehicleList data={data} loading={loading} error={error} />
    </Layout>
  );
};

export default Vehicles;
