import { NextPage } from 'next';
import { useState } from 'react';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);

  const addVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  return (
    <Layout>
      <CreateVehicleModal
        modalState={open}
        setModalState={addVehicleModalHandler}
      />
      <Button onClick={() => addVehicleModalHandler(true)}>Add Vehicle</Button>
      <VehicleList />
    </Layout>
  );
};

export default Home;
