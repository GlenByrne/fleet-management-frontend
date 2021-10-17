import { NextPage } from 'next';
import { useState } from 'react';
import TollTagList from 'components/TollTags/List/TollTagList';
import Layout from 'core/Layout/Layout';
import Button from 'core/Table/Button';
import CreateTollTagModal from 'components/TollTags/Modal/Create/CreateTollTagModal';
import { TollTag, TollTagUpdateModalItem } from 'constants/types';
import UpdateTollTagModal from 'components/TollTags/Modal/Update/UpdateTollTagModal';

const TollTags: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentTollTag, setCurrentTollTag] = useState<TollTagUpdateModalItem>({
    id: '',
    tagNumber: '',
    tagProvider: '',
    depot: {
      id: '',
      name: '',
    },
  });

  const addTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const updateTollTagModalHandler = (state: boolean) => {
    setUpdateModalOpen(state);
  };

  const changeCurrentTollTag = (tollTag: TollTag) => {
    const chosenTollTag: TollTagUpdateModalItem = {
      id: tollTag.id,
      tagNumber: tollTag.tagNumber,
      tagProvider: tollTag.tagProvider,
      depot: {
        id: tollTag.depot.id,
        name: tollTag.depot.name,
      },
    };
    setCurrentTollTag(chosenTollTag);
  };

  return (
    <Layout>
      <CreateTollTagModal
        modalState={open}
        setModalState={addTollTagModalHandler}
      />
      <UpdateTollTagModal
        modalState={updateModalOpen}
        modalStateHandler={updateTollTagModalHandler}
        tollTag={currentTollTag}
      />
      <Button onClick={() => addTollTagModalHandler(true)}>Add Tag</Button>
      <TollTagList
        updateTollTagModalHandler={updateTollTagModalHandler}
        changeCurrentTollTag={changeCurrentTollTag}
      />
    </Layout>
  );
};
export default TollTags;
