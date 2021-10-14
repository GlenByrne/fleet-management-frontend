import { NextPage } from 'next';
import { useState } from 'react';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentVehicleId, setCurrentVehicleId] = useState('');

  const addVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateVehicleModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const changeCurrentVehicle = (id: string) => {
    setCurrentVehicleId(id);
  };

  return (
    <Layout>
      <CreateVehicleModal
        modalState={open}
        setModalState={addVehicleModalHandler}
      />
      <UpdateVehicleModal
        modalState={updateModalOpen}
        modelStateHandler={updateVehicleModalHandler}
        vehicleId={currentVehicleId}
      />
      <Button onClick={() => addVehicleModalHandler(true)}>Add Vehicle</Button>
      <VehicleList
        updateVehicleModalHandler={updateVehicleModalHandler}
        changeCurrentVehicle={changeCurrentVehicle}
      />
    </Layout>
  );
};

export default Home;
