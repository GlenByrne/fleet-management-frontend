import { NextPage } from 'next';
import { useState } from 'react';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import DeleteVehicleModal from 'components/Vehicles/Modal/Delete/DeleteVehicleModal';

const Home: NextPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const addVehicleModalHandler = (state: boolean) => {
    setAddModalOpen(state);
  };

  const updateVehicleModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const deleteVehicleModalHandler = (state: boolean) => {
    setDeleteModalOpen(state);
  };

  return (
    <Layout quickAction={addVehicleModalHandler} quickActionLabel="New Vehicle">
      <CreateVehicleModal
        modalState={addModalOpen}
        setModalState={addVehicleModalHandler}
      />
      <UpdateVehicleModal
        modalState={updateModalOpen}
        setModalState={updateVehicleModalHandler}
      />
      <DeleteVehicleModal
        modalState={deleteModalOpen}
        setModalState={deleteVehicleModalHandler}
      />
      <VehicleList
        updateVehicleModalHandler={updateVehicleModalHandler}
        deleteVehicleModalHandler={deleteVehicleModalHandler}
      />
    </Layout>
  );
};

export default Home;
