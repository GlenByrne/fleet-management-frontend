import { ExclamationIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { successAlertStateVar, successTextVar } from 'src/apollo/apollo-client';
import {
  GetTollTagsDocument,
  GetTollTagsNotAssignedDocument,
  GetTollTagsQuery,
  GetVehiclesDocument,
  UpdateTollTagInput,
  useDeleteTollTagMutation,
} from '@/generated/graphql';
import Modal from '@/components/atoms/Modal';
import DangerButton from '@/components/atoms/DangerButton';
import CancelButton from '@/components/atoms/CancelButton';

type DeleteTollTagModalProps = {
  searchCriteria: string | null;
  currentTollTag: UpdateTollTagInput;
  modalState: boolean;
  changeModalState: (newState: boolean) => void;
};

const DeleteTollTagModal = ({
  searchCriteria,
  currentTollTag,
  modalState,
  changeModalState,
}: DeleteTollTagModalProps) => {
  const router = useRouter();
  const organisationId = String(router.query.organisationId);

  const [deleteTollTag] = useDeleteTollTagMutation({
    update: (cache, { data: mutationReturn }) => {
      const currentTollTags = cache.readQuery<GetTollTagsQuery>({
        query: GetTollTagsDocument,
        variables: {
          data: {
            organisationId: organisationId,
          },
        },
      });
      const newTollTags = currentTollTags?.tollTags?.edges.filter((tollTag) =>
        tollTag != null
          ? tollTag.node.id !== mutationReturn?.deleteTollTag.id
          : currentTollTags.tollTags
      );
      cache.writeQuery({
        query: GetTollTagsDocument,
        variables: {
          data: {
            organisationId: organisationId,
          },
        },
        data: { tollTags: newTollTags },
      });
      cache.evict({
        id: mutationReturn?.deleteTollTag.id,
      });
    },
    refetchQueries: [
      {
        query: GetVehiclesDocument,
        variables: {
          data: {
            organisationId: organisationId,
          },
        },
      },
      {
        query: GetTollTagsNotAssignedDocument,
        variables: {
          data: {
            organisationId,
          },
        },
      },
    ],
  });

  const deleteTagHandler = async (id: string) => {
    changeModalState(false);
    try {
      await deleteTollTag({
        variables: {
          data: {
            id: id,
          },
        },
      });

      successTextVar('Toll Tag deleted successfully');
      successAlertStateVar(true);
    } catch {}
  };

  const cancelButtonRef = useRef(null);

  return (
    <Modal
      modalState={modalState}
      setModalState={changeModalState}
      cancelButtonRef={cancelButtonRef}
    >
      <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Delete Toll Tag: {currentTollTag.tagNumber}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this tag? This will remove the
                toll tag from the list and disconnect the tag from its connected
                vehicle.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <DangerButton
            onClick={() => deleteTagHandler(currentTollTag.id)}
            text="Delete"
          />
          <CancelButton
            onClick={() => changeModalState(false)}
            ref={cancelButtonRef}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTollTagModal;
