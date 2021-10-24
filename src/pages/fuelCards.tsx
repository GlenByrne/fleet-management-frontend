import { NextPage } from 'next';
import { useState } from 'react';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import Button from '../core/Table/Button';
import Layout from 'core/Layout/Layout';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';

const FuelCards: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const addFuelCardModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateFuelCardModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  return (
    <Layout>
      <CreateFuelCardModal
        modalState={open}
        setModalState={addFuelCardModalHandler}
      />
      <UpdateFuelCardModal
        modalState={updateModalOpen}
        setModalState={updateFuelCardModalHandler}
      />
      <Button onClick={() => addFuelCardModalHandler(true)}>Add Card</Button>
      <FuelCardList updateFuelCardModalHandler={updateFuelCardModalHandler} />
    </Layout>
  );
};
export default FuelCards;
