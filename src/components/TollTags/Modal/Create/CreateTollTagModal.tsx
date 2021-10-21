import { useMutation, useQuery } from '@apollo/client';
import { FormEventHandler, useRef } from 'react';
import { Option } from 'constants/types';
import ModalFormInput from 'core/Modal/ModalFormInput';
import ModalFormSelect from 'core/Modal/ModalFormSelect';
import AddModal from 'core/Modal/AddModal';
import {
  Depot,
  GetItemsForUpdateVehicleDocument,
  GetSelectableItemsForAddVehicleDocument,
  GetTollTagsDocument,
  GetTollTagsQuery,
  useAddTollTagMutation,
  useGetSelectableItemsForAddTollTagQuery,
} from 'generated/graphql';

type CreateTollTagInputs = {
  tagNumber: JSX.Element;
  tagProvider: JSX.Element;
  depot: JSX.Element;
};

type CreateTollTagModalProps = {
  modalState: boolean;
  setModalState: (state: boolean) => void;
};

const getDepotOptions = (depots: Depot[]) => {
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

  // const [addTollTag] = useMutation<AddTollTag>(ADD_TOLL_TAG, {
  //   update: (cache, { data: mutationReturn }) => {
  //     const newTollTag = mutationReturn?.addTollTag;

  //     const currentTollTags = cache.readQuery<GetTollTags>({
  //       query: GET_TOLL_TAGS,
  //     });

  //     if (currentTollTags && newTollTag) {
  //       cache.writeQuery({
  //         query: GET_TOLL_TAGS,
  //         data: { tollTags: [...currentTollTags.tollTags, newTollTag] },
  //       });
  //     }
  //   },
  // });

  const [addTollTag] = useAddTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const newTollTag = mutationReturn?.addTollTag;
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
      });
      if (currentTollTags && newTollTag) {
        cache.writeQuery({
          query: GetTollTagsDocument,
          data: { tollTags: [{ ...currentTollTags.tollTags }, newTollTag] },
        });
      }
    },
    refetchQueries: [
      { query: GetSelectableItemsForAddVehicleDocument },
      { query: GetItemsForUpdateVehicleDocument },
    ],
  });

  const getCreateTollTagInputs = (depots: Option[]) => {
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

  const { data, loading, error } = useGetSelectableItemsForAddTollTagQuery();

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  const inputs = getCreateTollTagInputs(
    getDepotOptions(data.depots as Depot[])
  );

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
