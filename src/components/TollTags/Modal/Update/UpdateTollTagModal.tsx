/* This example requires Tailwind CSS v2.0+ */
import { FC, FormEventHandler, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_TOLL_TAGS,
  GET_SELECTABLE_ITEMS_FOR_UPDATE_TOLL_TAG,
  UPDATE_TOLL_TAG,
} from 'constants/queries';
import { Depot, Option, TollTagUpdateModalItem } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';

interface UpdateTollTagData {
  depots: Depot[] | undefined;
}

type UpdateTollTagInputs = {
  tagNumber: JSX.Element;
  tagProvider: JSX.Element;
  depot: JSX.Element;
};

type UpdateTollTagModalProps = {
  modalState: boolean;
  modalStateHandler: (status: boolean) => void;
  tollTag: TollTagUpdateModalItem;
};

const getDepotOptions = (depots: Depot[] | undefined) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const UpdateTollTagModal: FC<UpdateTollTagModalProps> = ({
  modalState,
  modalStateHandler,
  tollTag,
}) => {
  const tagNumberInputRef = useRef<HTMLInputElement>(null);
  const tagProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  const [updateTollTag] = useMutation(UPDATE_TOLL_TAG, {
    refetchQueries: [GET_TOLL_TAGS, 'GetTollTags'],
  });

  const getUpdateTollTagInputs = (depots: Option[] | undefined) => {
    const inputs: UpdateTollTagInputs = {
      tagNumber: (
        <ModalFormInput
          label="Tag Number"
          name="tagNumber"
          type="text"
          ref={tagNumberInputRef}
          required={true}
          defaultValue={tollTag.tagNumber}
        />
      ),
      tagProvider: (
        <ModalFormInput
          label="Tag Provider"
          name="tagProvider"
          type="text"
          ref={tagProviderInputRef}
          required={true}
          defaultValue={tollTag.tagProvider}
        />
      ),
      depot: (
        <ModalFormSelect
          label="Depot"
          name="depot"
          ref={depotIdInputRef}
          required={true}
          options={depots}
          defaultValue={tollTag.depot.id}
        />
      ),
    };

    return inputs;
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    modalStateHandler(false);
    updateTollTag({
      variables: {
        updateTollTagData: {
          id: tollTag.id,
          tagNumber: tagNumberInputRef.current?.value,
          tagProvider: tagProviderInputRef.current?.value,
          depotId:
            depotIdInputRef.current?.value === ''
              ? null
              : depotIdInputRef.current?.value,
        },
      },
    });
  };

  const { data, loading, error } = useQuery<UpdateTollTagData>(
    GET_SELECTABLE_ITEMS_FOR_UPDATE_TOLL_TAG
  );

  if (loading) {
    return <div className="h2">Loading...</div>;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  const inputs = getUpdateTollTagInputs(getDepotOptions(data?.depots));

  return (
    <UpdateModal
      modalState={modalState}
      setModalState={modalStateHandler}
      submitHandler={submitHandler}
      heading="Update Toll Tag"
      inputs={inputs}
    />
  );
};

export default UpdateTollTagModal;
