import { NextPage } from 'next';
import { useState } from 'react';
import VehicleList from '../components/Vehicles/List/VehicleList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateVehicleModal from 'components/Vehicles/Modal/Create/CreateVehicleModal';
import UpdateVehicleModal from 'components/Vehicles/Modal/Update/UpdateVehicleModal';
import { Vehicle, VehicleUpdateModalItem } from 'constants/types';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<VehicleUpdateModalItem>({
    id: '',
    registration: '',
    make: '',
    model: '',
    owner: '',
    cvrtDueDate: new Date(),
    tachoCalibrationDueDate: new Date(),
    thirteenWeekInspectionDueDate: new Date(),
    depot: {
      id: '',
      name: '',
    },
    fuelCard: {
      id: '',
      cardNumber: '',
    },
    tollTag: {
      id: '',
      tagNumber: '',
    },
  });

  const addVehicleModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateVehicleModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const changeCurrentVehicle = (vehicle: Vehicle) => {
    const chosenVehicle: VehicleUpdateModalItem = {
      id: vehicle.id,
      registration: vehicle.registration,
      make: vehicle.make,
      model: vehicle.model,
      owner: vehicle.owner,
      cvrtDueDate: vehicle.cvrtDueDate,
      tachoCalibrationDueDate: vehicle.tachoCalibrationDueDate,
      thirteenWeekInspectionDueDate: vehicle.thirteenWeekInspectionDueDate,
      depot: {
        id: vehicle.depot.id,
        name: vehicle.depot.name,
      },
      fuelCard: {
        id: vehicle.fuelCard === null ? '' : vehicle.fuelCard.id,
        cardNumber:
          vehicle.fuelCard === null ? '' : vehicle.fuelCard.cardNumber,
      },
      tollTag: {
        id: vehicle.tollTag === null ? '' : vehicle.tollTag.id,
        tagNumber: vehicle.tollTag === null ? '' : vehicle.tollTag.tagNumber,
      },
    };
    setCurrentVehicle(chosenVehicle);
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
        vehicle={currentVehicle}
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
