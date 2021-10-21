/* This example requires Tailwind CSS v2.0+ */
import { FormEventHandler, useRef } from 'react';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import UpdateModal from 'core/Modal/UpdateModal';
import {
  Depot,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetVehiclesDocument,
  useGetSelectableItemsForUpdateTollTagQuery,
  useUpdateTollTagMutation,
} from 'generated/graphql';
import { Option, TollTagUpdateModalItem } from 'constants/types';

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

const getDepotOptions = (depots: Depot[]) => {
  return depots?.map(
    (depot) => ({ value: depot.id, label: depot.name } as Option)
  );
};

const UpdateTollTagModal = ({
  modalState,
  modalStateHandler,
  tollTag,
}: UpdateTollTagModalProps) => {
  const tagNumberInputRef = useRef<HTMLInputElement>(null);
  const tagProviderInputRef = useRef<HTMLInputElement>(null);
  const depotIdInputRef = useRef<HTMLSelectElement>(null);

  const [updateTollTag] = useUpdateTollTagMutation({
    refetchQueries: [
      { query: GetVehiclesDocument },
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const getUpdateTollTagInputs = (depots: Option[]) => {
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
          tagNumber:
            tagNumberInputRef.current?.value != null
              ? tagNumberInputRef.current.value
              : '',
          tagProvider:
            tagProviderInputRef.current?.value != null
              ? tagProviderInputRef.current.value
              : '',
          depotId:
            depotIdInputRef.current?.value != null
              ? depotIdInputRef.current.value
              : '',
        },
      },
    });
  };

  const { data, loading, error } = useGetSelectableItemsForUpdateTollTagQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  const inputs = getUpdateTollTagInputs(
    getDepotOptions(data.depots as Depot[])
  );

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
