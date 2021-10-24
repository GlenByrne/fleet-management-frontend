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

  const people = [
    { id: 1, label: 'Wade Cooper' },
    { id: 2, label: 'Arlene Mccoy' },
    { id: 3, label: 'Devon Webb' },
    { id: 4, label: 'Tom Cook' },
    { id: 5, label: 'Tanya Fox' },
    { id: 6, label: 'Hellen Schmidt' },
    { id: 7, label: 'Caroline Schultz' },
    { id: 8, label: 'Mason Heaney' },
    { id: 9, label: 'Claudie Smitham' },
    { id: 10, label: 'Emil Schaefer' },
  ];

  const [selected, setSelected] = useState(people[3]);

  const addVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateVehicleModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  return (
    <Layout>
      <CreateVehicleModal
        modalState={open}
        setModalState={addVehicleModalHandler}
      />
      <UpdateVehicleModal
        modalState={updateModalOpen}
        setModalState={updateVehicleModalHandler}
      />
      <Button onClick={() => addVehicleModalHandler(true)}>Add Vehicle</Button>
      <VehicleList updateVehicleModalHandler={updateVehicleModalHandler} />
    </Layout>
  );
};

export default Home;
