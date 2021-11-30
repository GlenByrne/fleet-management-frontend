import { NextPage } from 'next';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from 'components/Vehicles/Modal/Delete/DeleteVehicleModal';
import { addVehicleModalStateVar } from 'constants/apollo-client';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useGetVehiclesQuery } from 'generated/graphql';
import UpdateVehicleTachoCalibrationModal from 'components/Vehicles/Modal/Update/UpdateVehicleTachoCalibrationModal';
import UpdateVehicleCVRTModal from 'components/Vehicles/Modal/Update/UpdateVehicleCVRTModal';
import UpdateVehicleThirteenWeekModal from 'components/Vehicles/Modal/Update/UpdateVehicleThirteenWeekInspectionModal';
import MainLayout from 'core/Layout/MainLayout/MainLayout';
import Loading from 'core/Loading';
import useAuthentication from 'hooks/useAuthentication';
import VehicleList from 'components/Vehicles/List/VehicleList';
import { useRouter } from 'next/router';

const Vehicles: NextPage = () => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);
  console.log(organisationId);

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

  const submitHandler: FormEventHandler = (e) => {
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

  return (
    <MainLayout
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
    </MainLayout>
  );
};

export default Vehicles;
