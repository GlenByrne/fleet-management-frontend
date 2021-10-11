import { NextPage } from 'next';
import { useState } from 'react';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';

const TollTags: NextPage = () => {
  const [open, setOpen] = useState(false);

  const addTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  return (
    <Layout>
      <CreateTollTagModal
        modalState={open}
        setModalState={addTollTagModalHandler}
      />
      <Button onClick={() => addTollTagModalHandler(true)}>Add Tag</Button>
      <TollTagList />
    </Layout>
  );
};
export default TollTags;
