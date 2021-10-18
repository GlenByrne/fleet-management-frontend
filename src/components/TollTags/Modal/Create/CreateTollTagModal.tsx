import { useMutation, useQuery } from '@apollo/client';
import { FC, FormEventHandler, useRef } from 'react';
import {
  ADD_TOLL_TAG,
  GET_SELECTABLE_ITEMS_FOR_ADD_TOLL_TAG,
  GET_TOLL_TAGS,
} from 'constants/queries';
import { AddTollTag, Depot, GetTollTags, Option } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';

interface SelectableItems {
  depots: Depot[];
}

type CreateTollTagInputs = {
  tagNumber: JSX.Element;
  tagProvider: JSX.Element;
  depot: JSX.Element;
};

type CreateTollTagModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[] | undefined) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const CreateTollTagModal = ({
  modalState,
  setModalState,
}: CreateTollTagModalProps) => {
  const tagNumberInputRef = useRef<HTMLInputElement>(null);
  const tagProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  // const [addTollTag] = useMutation(ADD_TOLL_TAG, {
  //   refetchQueries: [GET_TOLL_TAGS, 'GetTollTags'],
  // });

  const [addTollTag] = useMutation<AddTollTag>(ADD_TOLL_TAG, {
    update: (cache, { data: mutationReturn }) => {
      const newTollTag = mutationReturn?.addTollTag;

      const currentTollTags = cache.readQuery<GetTollTags>({
        query: GET_TOLL_TAGS,
      });

      if (currentTollTags && newTollTag) {
        cache.writeQuery({
          query: GET_TOLL_TAGS,
          data: { tollTags: [...currentTollTags.tollTags, newTollTag] },
        });
      }
    },
  });

  const getCreateTollTagInputs = (depots: Option[] | undefined) => {
    const inputs: CreateTollTagInputs = {
      tagNumber: (
        <ModalFormInput
          label="Tag Number"
          name="tagNumber"
          type="text"
          ref={tagNumberInputRef}
          required={true}
        />
      ),
      tagProvider: (
        <ModalFormInput
          label="Tag Provider"
          name="tagProvider"
          type="text"
          ref={tagProviderInputRef}
          required={true}
        />
      ),
      depot: (
        <ModalFormSelect
          label="Depot"
          name="depot"
          ref={depotIdInputRef}
          required={true}
          options={depots}
        />
      ),
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    setModalState(false);
    addTollTag({
      variables: {
        addTollTagData: {
          tagNumber: tagNumberInputRef.current?.value,
          tagProvider: tagProviderInputRef.current?.value,
          depotId: depotIdInputRef.current?.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<SelectableItems>(
    GET_SELECTABLE_ITEMS_FOR_ADD_TOLL_TAG
  );

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  const inputs = getCreateTollTagInputs(getDepotOptions(data?.depots));

  return (
    <AddModal
      modalState={modalState}
      setModalState={setModalState}
      submitHandler={submitHandler}
      heading="Add Toll Tag"
      inputs={inputs}
    />
  );
};

export default CreateTollTagModal;
