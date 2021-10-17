import { NextPage } from 'next';
import { useState } from 'react';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import Button from '../core/Table/Button';
import Layout from 'core/Layout/Layout';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import { FuelCard, FuelCardUpdateModalItem } from 'constants/types';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';

const FuelCards: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentFuelCard, setCurrentFuelCard] =
    useState<FuelCardUpdateModalItem>({
      id: '',
      cardNumber: '',
      cardProvider: '',
      depot: {
        id: '',
        name: '',
      },
    });

  const addFuelCardModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateFuelCardModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const changeCurrentFuelCard = (fuelCard: FuelCard) => {
    const chosenFuelCard: FuelCardUpdateModalItem = {
      id: fuelCard.id,
      cardNumber: fuelCard.cardNumber,
      cardProvider: fuelCard.cardProvider,
      depot: {
        id: fuelCard.depot.id,
        name: fuelCard.depot.name,
      },
    };
    setCurrentFuelCard(chosenFuelCard);
  };

  return (
    <Layout>
      <CreateFuelCardModal
        modalState={open}
        setModalState={addFuelCardModalHandler}
      />
      <UpdateFuelCardModal
        modalState={updateModalOpen}
        modalStateHandler={updateFuelCardModalHandler}
        fuelCard={currentFuelCard}
      />
      <Button onClick={() => addFuelCardModalHandler(true)}>Add Card</Button>
      <FuelCardList
        updateFuelCardModalHandler={updateFuelCardModalHandler}
        changeCurrentFuelCard={changeCurrentFuelCard}
      />
    </Layout>
  );
};
export default FuelCards;
