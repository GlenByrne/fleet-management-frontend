// import { DocumentNode } from 'graphql';
// import { NextPage } from 'next';
// import Head from 'next/head';
// import { useState } from 'react';
// import ClientOnly from '../components/ClientOnly/ClientOnly';
// import Navbar from '../components/Navigation/Navbar/Navbar';
// import AddTollTagModal from '../components/TollTags/AddTollTagModal';
// import TollTagList from '../components/TollTags/TollTagList';
// import { ADD_TOLL_TAG, GET_TOLL_TAGS } from '../lib/queries';

// const TollTags: NextPage = () => {
//   const [open, setOpen] = useState(false);

//   const addTollTagModalHandler = (state: boolean) => {
//     setOpen(state);
//   };

//   return (
//     <div>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <nav>
//         <Navbar />
//       </nav>

//       <main>
//         <ClientOnly>
//           <AddTollTagModal
//             modalState={open}
//             setModalState={addTollTagModalHandler}
//           />
//           <TollTagList setModalState={addTollTagModalHandler} />
//         </ClientOnly>
//       </main>
//     </div>
//   );
// };
// export default TollTags;

import { useMutation, useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { NextPage } from 'next';
import Head from 'next/head';
import { FormEventHandler, Fragment, useState } from 'react';
import ClientOnly from '../components/ClientOnly/ClientOnly';
import Navbar from '../components/Navigation/Navbar/Navbar';
import AddModal from '../components/TollTags/GenericAddModal';
import AddTollTagModal from '../components/TollTags/AddTollTagModal';
import ModalFormInput from '../components/TollTags/GenericModalFormInput';
import ModalFormSelect from '../components/TollTags/GenericModalFormSelect';
import TollTagList from '../components/TollTags/TollTagList';
import {
  ADD_TOLL_TAG,
  GET_SELECTABLE_ITEMS_FOR_ADD_TOLL_TAG,
  GET_TOLL_TAGS,
} from '../lib/queries';
import { Depot, ModalMutations, SelectableItem, TollTag } from '../lib/types';
import Button from '../components/Table/Button';

interface AddInputData {
  depots: Depot[];
}

type AddTollTagInputs = {
  tagNumber: JSX.Element;
  tagProvider: JSX.Element;
  depot: JSX.Element;
};

let tagNumber: any, tagProvider: any, depotId: any;

const getAddTollTagInputs = (depots: Depot[] | undefined) => {
  const inputs: AddTollTagInputs = {
    tagNumber: (
      <ModalFormInput
        title="Tag Number"
        name="tagNumber"
        type="text"
        ref={tagNumber}
        required={true}
      />
    ),
    tagProvider: (
      <ModalFormInput
        title="Tag Provider"
        name="tagProvider"
        type="text"
        ref={tagProvider}
        required={true}
      />
    ),
    depot: (
      <ModalFormSelect
        title="Depot"
        name="depot"
        ref={depotId}
        required={true}
        items={depots}
      />
    ),
  };

  return inputs;
};

const TestTollTags: NextPage = () => {
  const [open, setOpen] = useState(false);

  const addTollTagModalHandler = (state: boolean) => {
    setOpen(state);
  };

  const [addTollTag] = useMutation(ADD_TOLL_TAG, {
    refetchQueries: [GET_TOLL_TAGS, 'GetTollTags'],
  });

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    addTollTagModalHandler(false);
    addTollTag({
      variables: {
        addTollTagData: {
          tagNumber: tagNumber.value,
          tagProvider: tagProvider.value,
          depotId: depotId.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<AddInputData>(
    GET_SELECTABLE_ITEMS_FOR_ADD_TOLL_TAG
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  const inputs = getAddTollTagInputs(data?.depots);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
      </nav>

      <main>
        <ClientOnly>
          <AddModal
            modalState={open}
            setModalState={addTollTagModalHandler}
            submitHandler={submitHandler}
            heading="Add Toll Tag"
            inputs={inputs}
          />
          <Button onClick={() => addTollTagModalHandler(true)}>Add Card</Button>
          <TollTagList setModalState={addTollTagModalHandler} />
        </ClientOnly>
      </main>
    </div>
  );
};
export default TestTollTags;
