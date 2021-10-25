import { NextPage } from 'next';
import { useState } from 'react';
import FuelCardList from 'components/FuelCards/List/FuelCardList';
import Layout from 'core/Layout/Layout';
import CreateFuelCardModal from 'components/FuelCards/Modal/Create/CreateFuelCardModal';
import UpdateFuelCardModal from 'components/FuelCards/Modal/Update/UpdateFuelCardModal';
import DeleteFuelCardModal from 'components/FuelCards/Modal/Delete/DeleteFuelCardModal';

const FuelCards: NextPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const addFuelCardModalHandler = (state: boolean) => {
    setAddModalOpen(state);
  };

  const updateFuelCardModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const deleteFuelCardModalHandler = (state: boolean) => {
    setDeleteModalOpen(state);
  };

  return (
    <Layout quickAction={addFuelCardModalHandler} quickActionLabel="New Card">
      <CreateFuelCardModal
        modalState={addModalOpen}
        setModalState={addFuelCardModalHandler}
      />
      <UpdateFuelCardModal
        modalState={updateModalOpen}
        setModalState={updateFuelCardModalHandler}
      />
      <DeleteFuelCardModal
        modalState={deleteModalOpen}
        setModalState={deleteFuelCardModalHandler}
      />
      <FuelCardList
        updateFuelCardModalHandler={updateFuelCardModalHandler}
        deleteFuelCardModalHandler={deleteFuelCardModalHandler}
      />
    </Layout>
  );
};
export default FuelCards;
