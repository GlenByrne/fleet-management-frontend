import { NextPage } from 'next';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from 'components/Vehicles/Modal/Delete/DeleteVehicleModal';
import {
  addVehicleModalStateVar,
  currentUserVar,
} from 'constants/apollo-client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetCurrentUserQuery } from 'generated/graphql';
import { useReactiveVar } from '@apollo/client';

const Vehicles: NextPage = () => {
  return (
    <Layout
      hasQuickActionButton={true}
      quickAction={addVehicleModalStateVar}
      quickActionLabel="New Vehicle"
    >
      <CreateVehicleModal />
      <UpdateVehicleModal />
      <DeleteVehicleModal />
      <VehicleList />
    </Layout>
  );
};

export default Vehicles;
