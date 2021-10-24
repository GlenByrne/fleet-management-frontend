import { NextPage } from 'next';
import { useState } from 'react';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';

const TollTags: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const addTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateTollTagModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  return (
    <Layout>
      <CreateTollTagModal
        modalState={open}
        setModalState={addTollTagModalHandler}
      />
      <UpdateTollTagModal
        modalState={updateModalOpen}
        setModalState={updateTollTagModalHandler}
      />
      <Button onClick={() => addTollTagModalHandler(true)}>Add Tag</Button>
      <TollTagList updateTollTagModalHandler={updateTollTagModalHandler} />
    </Layout>
  );
};

export default TollTags;
