import { NextPage } from 'next';
import { useState } from 'react';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import Button from '../core/Table/Button';
import Layout from 'core/Layout/Layout';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';

const FuelCards: NextPage = () => {
  const [open, setOpen] = useState(false);

  const addFuelCardModalHandler = (state: boolean) => {
    setOpen(state);
  };

  return (
    <Layout>
      <CreateFuelCardModal
        modalState={open}
        setModalState={addFuelCardModalHandler}
      />
      <Button onClick={() => addFuelCardModalHandler(true)}>Add Card</Button>
      <FuelCardList />
    </Layout>
  );
};
export default FuelCards;
