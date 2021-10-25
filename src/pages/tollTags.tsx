import { NextPage } from 'next';
import { useState } from 'react';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';
import DeleteTollTagModal from 'components/TollTags/Modal/Delete/DeleteTollTagModal';

const TollTags: NextPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const addTollTagModalHandler = (state: boolean) => {
    setAddModalOpen(state);
  };

  const updateTollTagModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const deleteTollTagModalHandler = (state: boolean) => {
    setDeleteModalOpen(state);
  };

  return (
    <Layout quickAction={addTollTagModalHandler} quickActionLabel="New Tag">
      <CreateTollTagModal
        modalState={addModalOpen}
        setModalState={addTollTagModalHandler}
      />
      <UpdateTollTagModal
        modalState={updateModalOpen}
        setModalState={updateTollTagModalHandler}
      />
      <DeleteTollTagModal
        modalState={deleteModalOpen}
        setModalState={deleteTollTagModalHandler}
      />
      <TollTagList
        updateTollTagModalHandler={updateTollTagModalHandler}
        deleteTollTagModalHandler={deleteTollTagModalHandler}
      />
    </Layout>
  );
};

export default TollTags;
